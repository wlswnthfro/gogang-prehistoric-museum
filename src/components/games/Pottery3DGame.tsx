import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import confetti from 'canvas-confetti';
import { useGame } from '../../context/GameContext';
import { RotateCw, CheckCircle2, RefreshCw, Sparkles, Layers, Info } from 'lucide-react';

interface ShardPiece {
  id: number;
  name: string;
  nameHanja: string;
  desc: string;
  targetPos: [number, number, number];
  placed: boolean;
  color: number;
}

export const Pottery3DGame: React.FC = () => {
  const { awardStamp, playSound } = useGame();
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPieceId, setSelectedPieceId] = useState<number | null>(null);
  const [placedPieces, setPlacedPieces] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showPatternLines, setShowPatternLines] = useState<boolean>(true);

  const shards: ShardPiece[] = [
    {
      id: 1,
      name: '구연부 (아가리)',
      nameHanja: '口緣部',
      desc: '그릇의 가장 윗부분으로 점열문(점무늬)과 사선문이 새겨져 있습니다.',
      targetPos: [0, 1.4, 0],
      placed: placedPieces.includes(1),
      color: 0xC48247
    },
    {
      id: 2,
      name: '동체부 상단 (몸체 좌측)',
      nameHanja: '胴體部 上',
      desc: '생선 가시 모양의 어골문(魚骨紋) 빗살무늬가 정교하게 새겨진 조각입니다.',
      targetPos: [-0.3, 0.4, 0.3],
      placed: placedPieces.includes(2),
      color: 0xB57139
    },
    {
      id: 3,
      name: '동체부 하단 (몸체 우측)',
      nameHanja: '胴體部 下',
      desc: '불에 구워져 적갈색을 띠며 단단하게 점토를 다져 만든 조각입니다.',
      targetPos: [0.3, -0.3, -0.2],
      placed: placedPieces.includes(3),
      color: 0x9E5B26
    },
    {
      id: 4,
      name: '저부 (뾰족한 바닥)',
      nameHanja: '底部',
      desc: '신석기시대 모래밭이나 화덕 바닥에 꽂아 세우기 좋도록 뾰족한 첨저형 바닥입니다.',
      targetPos: [0, -1.3, 0],
      placed: placedPieces.includes(4),
      color: 0x82461A
    }
  ];

  // Three.js scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const piecesMeshMap = useRef<Map<number, THREE.Mesh>>(new Map());
  const ghostMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 4.8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5e6, 1.2);
    dirLight1.position.set(3, 4, 3);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xb59f80, 0.6);
    dirLight2.position.set(-3, -2, -2);
    scene.add(dirLight2);

    // Main rotating group
    const mainGroup = new THREE.Group();
    groupRef.current = mainGroup;
    scene.add(mainGroup);

    // Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.15, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xded2c1,
      roughness: 0.8,
      metalness: 0.1
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.9;
    scene.add(pedestal);

    // Translucent Outline Ghost Pottery (Target guide)
    const ghostGeo = new THREE.ConeGeometry(1.2, 2.7, 32, 16, true);
    ghostGeo.rotateX(Math.PI);
    const ghostMat = new THREE.MeshBasicMaterial({
      color: 0xcbbba6,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const ghostMesh = new THREE.Mesh(ghostGeo, ghostMat);
    ghostMesh.position.y = 0;
    mainGroup.add(ghostMesh);
    ghostMeshRef.current = ghostMesh;

    // Create 4 distinct pottery geometry sections
    piecesMeshMap.current.clear();

    // 1. Rim piece
    const rimGeo = new THREE.CylinderGeometry(1.2, 1.05, 0.65, 32, 4, true);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xC48247,
      roughness: 0.9,
      side: THREE.DoubleSide
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.set(0, 1.05, 0);
    rimMesh.visible = placedPieces.includes(1);
    mainGroup.add(rimMesh);
    piecesMeshMap.current.set(1, rimMesh);

    // 2. Upper body piece (Half cone)
    const upperGeo = new THREE.CylinderGeometry(1.05, 0.65, 0.95, 32, 4, true, 0, Math.PI);
    const upperMat = new THREE.MeshStandardMaterial({
      color: 0xB57139,
      roughness: 0.88,
      side: THREE.DoubleSide
    });
    const upperMesh = new THREE.Mesh(upperGeo, upperMat);
    upperMesh.position.set(0, 0.25, 0);
    upperMesh.visible = placedPieces.includes(2);
    mainGroup.add(upperMesh);
    piecesMeshMap.current.set(2, upperMesh);

    // 3. Lower body piece (Opposite half cylinder/cone)
    const lowerGeo = new THREE.CylinderGeometry(1.05, 0.65, 0.95, 32, 4, true, Math.PI, Math.PI);
    const lowerMat = new THREE.MeshStandardMaterial({
      color: 0x9E5B26,
      roughness: 0.88,
      side: THREE.DoubleSide
    });
    const lowerMesh = new THREE.Mesh(lowerGeo, lowerMat);
    lowerMesh.position.set(0, 0.25, 0);
    lowerMesh.visible = placedPieces.includes(3);
    mainGroup.add(lowerMesh);
    piecesMeshMap.current.set(3, lowerMesh);

    // 4. Base point piece (Bottom cone)
    const baseGeo = new THREE.ConeGeometry(0.65, 1.15, 32, 4, false);
    baseGeo.rotateX(Math.PI);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x82461A,
      roughness: 0.92
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.set(0, -0.8, 0);
    baseMesh.visible = placedPieces.includes(4);
    mainGroup.add(baseMesh);
    piecesMeshMap.current.set(4, baseMesh);

    // Mouse / Touch interaction for rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !mainGroup) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      mainGroup.rotation.y += deltaX * 0.01;
      mainGroup.rotation.x = Math.max(-0.4, Math.min(0.4, mainGroup.rotation.x + deltaY * 0.005));

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('touchstart', onMouseDown, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (autoRotate && !isDragging && mainGroup) {
        mainGroup.rotation.y += 0.006;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
      renderer.dispose();
    };
  }, []);

  // Update visibility when placedPieces change
  useEffect(() => {
    piecesMeshMap.current.forEach((mesh, id) => {
      mesh.visible = placedPieces.includes(id);
    });

    if (ghostMeshRef.current) {
      ghostMeshRef.current.visible = showPatternLines;
    }

    if (placedPieces.length === 4 && !isCompleted) {
      setIsCompleted(true);
      awardStamp('pottery-3d');
      playSound('success');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [placedPieces, showPatternLines]);

  const handlePlacePiece = (id: number) => {
    if (placedPieces.includes(id)) return;
    playSound('stamp');
    setPlacedPieces(prev => [...prev, id]);
    setSelectedPieceId(null);
  };

  const handleReset = () => {
    playSound('click');
    setPlacedPieces([]);
    setIsCompleted(false);
    setSelectedPieceId(null);
  };

  const completionPct = Math.round((placedPieces.length / 4) * 100);

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[560px] gap-4 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E3D9C8]">
      {/* 3D Viewport Area */}
      <div className="flex-1 flex flex-col relative rounded-xl bg-gradient-to-b from-[#F3ECE0] to-[#E9DFCE] border border-[#D8CABE] overflow-hidden min-h-[380px]">
        {/* Top Control Bar inside 3D Viewport */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <div className="bg-[#FAF7F2]/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#DACBB9] shadow-sm pointer-events-auto">
            <span className="text-xs font-semibold text-[#66523E]">복원 진척도:</span>{' '}
            <span className="text-sm font-bold text-[#A74C13]">{completionPct}% ({placedPieces.length}/4 조각)</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-lg text-xs font-medium border transition-colors shadow-sm flex items-center gap-1.5 ${
                autoRotate
                  ? 'bg-[#FAF7F2] text-[#634E39] border-[#DACBB9]'
                  : 'bg-[#E3D7C5] text-[#8C765F] border-[#DACBB9]'
              }`}
              title="3D 자동 회전 켜기/끄기"
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              <span className="hidden sm:inline">회전</span>
            </button>
            <button
              onClick={() => setShowPatternLines(!showPatternLines)}
              className={`p-2 rounded-lg text-xs font-medium border transition-colors shadow-sm flex items-center gap-1.5 ${
                showPatternLines
                  ? 'bg-[#A74C13] text-white border-[#873A0B]'
                  : 'bg-[#FAF7F2] text-[#634E39] border-[#DACBB9]'
              }`}
              title="가이드 외곽선 켜기/끄기"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">가이드선</span>
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-lg text-xs font-medium bg-[#FAF7F2] text-[#634E39] border border-[#DACBB9] hover:bg-[#EFE6D7] transition-colors shadow-sm flex items-center gap-1.5"
              title="다시 복원하기"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">초기화</span>
            </button>
          </div>
        </div>

        {/* 3D Canvas Mount Point */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating Touch Drag Hint */}
        <div className="absolute bottom-3 left-3 text-[11px] text-[#8B7864] bg-[#FAF7F2]/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-[#DFD3C2] pointer-events-none">
          💡 화면을 드래그하거나 터치하여 3D 토기를 360도로 회전할 수 있습니다.
        </div>

        {/* Completion Celebration Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6 z-20 animate-in fade-in duration-300">
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border-2 border-[#A74C13] shadow-2xl max-w-md text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FCECD8] text-[#A74C13] flex items-center justify-center mb-3">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#3B2C1F] mb-1 font-serif-kr">
                신석기 빗살무늬토기 복원 완료!
              </h3>
              <p className="text-xs text-[#705D4A] mb-4 leading-relaxed">
                축하합니다! 고강선사유적지의 대표 유물인 빗살무늬토기를 완벽하게 복원하였습니다.
                선사 스탬프가 성공적으로 지급되었습니다.
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-medium text-[#594635] bg-[#EBE2D3] hover:bg-[#DDD3C2] rounded-lg transition-colors"
                >
                  다시 조립하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Shards Dock & Relic Info */}
      <div className="w-full lg:w-80 flex flex-col gap-3">
        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#DFD3C2]">
          <h3 className="text-sm font-bold text-[#3D2F22] flex items-center gap-1.5 mb-1 font-serif-kr">
            <span className="w-2 h-2 rounded-full bg-[#A74C13]"></span>
            발굴된 토기 파편 선택
          </h3>
          <p className="text-xs text-[#7A6753] mb-3">
            아래 조각을 터치하여 3D 토기의 알맞은 위치에 끼워 넣으세요.
          </p>

          {/* Shards List */}
          <div className="space-y-2">
            {shards.map((shard) => {
              const isPlaced = shard.placed;
              const isSelected = selectedPieceId === shard.id;

              return (
                <div
                  key={shard.id}
                  onClick={() => {
                    if (!isPlaced) {
                      handlePlacePiece(shard.id);
                    }
                  }}
                  className={`p-3 rounded-lg border transition-all text-left flex items-start gap-3 cursor-pointer ${
                    isPlaced
                      ? 'bg-[#EFE8DC]/60 border-[#D8CBB9] opacity-75'
                      : isSelected
                      ? 'bg-[#FAF0E1] border-[#A74C13] shadow-xs'
                      : 'bg-white hover:bg-[#FDFBF7] border-[#DFD3C2] shadow-xs hover:border-[#BA9A7C]'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center font-bold text-white text-xs shadow-xs"
                    style={{ backgroundColor: isPlaced ? '#9CA3AF' : `#${shard.color.toString(16)}` }}
                  >
                    {isPlaced ? <CheckCircle2 className="w-5 h-5" /> : `0${shard.id}`}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-[#3E2E20] truncate">
                        {shard.name}
                      </span>
                      <span className="text-[10px] text-[#8C765F] font-mono">
                        {shard.nameHanja}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#715E4C] mt-0.5 line-clamp-2 leading-relaxed">
                      {shard.desc}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      {isPlaced ? (
                        <span className="text-[10px] font-medium text-[#2D6A4F] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> 복원 부착 완료
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="px-2.5 py-1 text-[11px] font-semibold text-white bg-[#A74C13] hover:bg-[#8B3B09] rounded-md transition-colors shadow-xs"
                        >
                          조각 맞추기 +
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Historical Educational Tip Card */}
        <div className="bg-[#F4ECE0] p-3.5 rounded-xl border border-[#DFD3C2] text-xs text-[#594635] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#A74C13] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold text-[#3D2E20]">빗살무늬토기 이야기</strong>
            <p className="text-[11px] text-[#695644] mt-0.5">
              기원전 약 4000~5000년경 신석기인들은 점토 띠를 말아 올린 뒤 생선 뼈나 나뭇가지로 빗살무늬를 새겨 그릇이 마를 때 갈라지지 않도록 했습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
