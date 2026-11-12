import { GameMetadata } from '../types/game';

export const GAMES_DATA: GameMetadata[] = [
  {
    id: 'pottery-3d',
    title: '3D 토기 조각 맞추기',
    shortDesc: '깨진 신석기 빗살무늬토기 조각들을 3차원으로 회전하고 맞춰 복원해보세요!',
    description: '고강동 유적에서 출토된 대표적인 빗살무늬토기와 민무늬토기의 깨진 파편들을 3D 뷰어에서 회전하고 알맞은 위치에 끼워 완성하는 복원 퍼즐 체험입니다.',
    era: '신석기 시대',
    relic: '빗살무늬토기 (櫛目文土器)',
    targetAge: '전체 연령 (초등 전학년)',
    difficulty: '보통',
    color: '#B45309',
    thumbnailUrl: '/assets/pottery_thumb.svg',
    tags: ['3D 인터랙티브', '유물 복원', '빗살무늬', '퍼즐']
  },
  {
    id: 'stone-knife',
    title: '반달돌칼 게임',
    shortDesc: '청동기시대 농경의 필수품! 반달돌칼로 황금빛 볏이삭을 리듬에 맞춰 수확하세요.',
    description: '가운데 구멍에 끈을 꿰어 손가락에 끼워 사용하던 반달돌칼로 익은 곡식 이삭을 자르는 타이밍 수확 게임입니다. 청동기 농경문화를 재미있게 배워보세요.',
    era: '청동기 시대',
    relic: '반달돌칼 (半月形石刀)',
    targetAge: '초등학생 이상',
    difficulty: '쉬움',
    color: '#854D0E',
    thumbnailUrl: '/assets/thumbnails/rice_harvest_game.png',
    tags: ['수확 타이밍', '청동기 농경', '곡식 자르기', '리듬 액션']
  },
  {
    id: 'escape-room',
    title: '방탈출 게임',
    shortDesc: '어둠에 잠긴 선사시대 움집의 불씨를 되살리고 암각화 암호를 풀어 탈출하세요!',
    description: '선사시대 움집 속에 갇힌 탐험가가 되어 부싯돌로 모닥불 피우기, 바위 그림(암각화) 퍼즐 해독, 빗장 열기 3단계를 차례로 해결하는 미스터리 방탈출입니다.',
    era: '선사 종합',
    relic: '움집 및 부싯돌·암각화',
    targetAge: '초등 3학년 이상',
    difficulty: '도전',
    color: '#C2410C',
    thumbnailUrl: '/assets/thumbnails/escape_room_game.png',
    tags: ['미스터리', '움집 탐험', '암호 해독', '스토리형']
  },
  {
    id: 'custom-bow',
    title: '커스텀 활게임',
    shortDesc: '원하는 활대, 시위, 깃털을 조합해 나만의 선사 활을 만들고 표적을 정조준하세요!',
    description: '선사시대 사냥과 방어의 핵심이었던 활을 다양한 천연 재료(참나무·사슴힘줄·솔개깃)로 직접 커스텀하고, 바람과 거리를 계산해 과녁을 맞추는 슈팅 체험입니다.',
    era: '신석기 시대',
    relic: '간돌화살촉 및 선사 목궁',
    targetAge: '전체 연령',
    difficulty: '보통',
    color: '#2D6A4F',
    thumbnailUrl: '/assets/thumbnails/custom_bow_game.png',
    tags: ['무기 커스텀', '사격 슈팅', '화살촉', '바람 계산']
  }
];

export const GOGANG_HERITAGE_INFO = {
  name: '고강선사유적체험관',
  subTitle: 'Gogang Prehistoric Heritage Center',
  location: '경기도 부천시 오정구 고강동 산90-1 일원 (청룡산/고강선사유적공원)',
  historicalValue: '신석기시대부터 청동기시대, 초기철기시대에 이르는 주거지와 적석환구유구, 제사 유적이 함께 발굴된 유서 깊은 복합 선사 유적지입니다.',
  keyRelics: ['빗살무늬토기', '민무늬토기', '반달돌칼', '간돌검', '돌도끼', '적석환구유구'],
  operatingHours: '화~일요일 09:30 ~ 17:30 (매주 월요일 휴관)',
  inquiry: '032-625-8300 (안내데스크)'
};
