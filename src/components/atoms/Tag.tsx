import React from 'react';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { RoleTagVariant } from '@/types/tags/roleTag.type';
import { HubTagVariant } from '@/types/tags/hubTag.type';
import { MeetingTagVariant } from '@/types/tags/meetingTag.type';
import { ContentsFeedTagVariant } from '@/types/tags/contentsFeedTag.type';
import { HubSkillTagVariant } from '@/types/tags/hubSkillTag.type';
import { StatusTagVariant } from '@/types/tags/statusTag.type';

interface RoleTagProps {
  type: 'roleTag';
  label: string;
  variant?: RoleTagVariant;
}

interface StatusTagProps {
  type: 'statusTag';
  label: string;
  variant: StatusTagVariant;
}

interface HubTagProps {
  type: 'hubTag';
  label: string;
  variant: HubTagVariant;
}

interface MeetingTagProps {
  type: 'meetingTag';
  label: string;
  variant: MeetingTagVariant;
}

interface ContentsFeedTagProps {
  type: 'contentsFeed';
  label: string;
  variant: ContentsFeedTagVariant;
}

interface HubSkillTagProps {
  type: 'skillTag';
  label: string;
  variant: HubSkillTagVariant;
}

type TagProps =
  | RoleTagProps
  | HubTagProps
  | MeetingTagProps
  | ContentsFeedTagProps
  | StatusTagProps
  | HubSkillTagProps;

const tagStyles = cva(
  'inline-flex items-center px-3 py-1 text-[12px] font-medium rounded-full',
  {
    variants: {
      type: {
        roleTag: 'bg-lightgray',
        meetingTag: '',
        statusTag: '',
        hubTag: '',
        contentsFeed: '',
        skillTag: 'bg-lightgray',
      },
      variant: {
        고민: 'bg-[#CDF4FF] text-[#729CFF] px-2 text-[12px] rounded-[5px]',
        회고: 'bg-[#FFCDCD] text-[#FF5E5E] px-2 text-[12px] rounded-[5px]',
        아이디어: 'bg-[#ECD1FF] text-[#AA5DFF] px-2 text-[12px] rounded-[5px]',
        계획: 'bg-[#D6FFD4] text-[#4BBF47] px-2  text-[12px] rounded-[5px]',
        토론: 'bg-[#D7E3FF] text-[#5870FF] px-2 text-[12px] rounded-[5px]',
        정보공유: 'bg-[#FFD4F4] text-[#FF5EA2] px-2 text-[12px] rounded-[5px]',
        추천: 'bg-[#F5E4D2] text-[#D69655] px-2  text-[12px] rounded-[5px]',
        질문: 'bg-[#FFE7D4] text-[#FF9F5E] px-2 text-[12px] rounded-[5px]',

        // hubTag
        PROJECT:
          'bg-gradient-to-r from-[#87DBFF] to-[#FFA9BE] text-[14px] rounded-full',
        OUTSOURCING:
          'bg-gradient-to-r from-[#FF8800] to-[#84FF74] text-[14px] rounded-full',

        // meetingTag
        ONLINE:
          'bg-gradient-to-r from-[#039160] to-[#96FFDA] text-[14px] rounded-full',
        OFFLINE:
          'bg-gradient-to-r from-[#FF383B] to-[#FFBCBD] text-[14px] rounded-full',

        // statusTag
        OPEN: 'bg-gradient-to-r from-[#9340FF] to-[#FFDCDC] text-[14px] rounded-full',
        CLOSE:
          'bg-gradient-to-r from-[#000000] to-[#FFFFFF] text-[14px] rounded-full',

        // roleTag
        '서버/백엔드 개발자': 'text-darkgray text-[12px] rounded-full',
        '프론트엔드 개발자': 'text-darkgray text-[12px] rounded-full',
        '웹 풀스택 개발자': 'text-darkgray text-[12px] rounded-full',
        '안드로이드 개발자': 'text-darkgray text-[12px] rounded-full',
        'IOS 개발자': 'text-darkgray text-[12px] rounded-full',
        '크로스플랫폼 앱개발자': 'text-darkgray text-[12px] rounded-full',
        '게임 클라이언트 개발자': 'text-darkgray text-[12px] rounded-full',
        '게임 서버 개발자': 'text-darkgray text-[12px] rounded-full',
        DBA: 'text-darkgray text-[12px] rounded-full',
        '빅데이터 엔지니어': 'text-darkgray text-[12px] rounded-full',
        '인공지능/머신러닝': 'text-darkgray text-[12px] rounded-full',
        'devops/시스템 엔지니어': 'text-darkgray text-[12px] rounded-full',
        '정보보안 담당자': 'text-darkgray text-[12px] rounded-full',
        'QA 엔지니어': 'text-darkgray text-[12px] rounded-full',
        '개발 PM': 'text-darkgray text-[12px] rounded-full',
        'HW/임베디드': 'text-darkgray text-[12px] rounded-full',
        'SW/솔루션': 'text-darkgray text-[12px] rounded-full',
        웹퍼블리셔: 'text-darkgray text-[12px] rounded-full',
        'VR/AR/3D': 'text-darkgray text-[12px] rounded-full',
        블록체인: 'text-darkgray text-[12px] rounded-full',
        'CI/BI 로고 디자이너': 'text-darkgray text-[12px] rounded-full',
        '광고 디자이너': 'text-darkgray text-[12px] rounded-full',
        '게임 디자이너': 'text-darkgray text-[12px] rounded-full',
        '서체 디자이너': 'text-darkgray text-[12px] rounded-full',
        '웹 디자이너': 'text-darkgray text-[12px] rounded-full',
        'UI/UX 디자이너': 'text-darkgray text-[12px] rounded-full',
        '영상 디자이너': 'text-darkgray text-[12px] rounded-full',
        일러스트레이터: 'text-darkgray text-[12px] rounded-full',
        '캐릭터 디자이너': 'text-darkgray text-[12px] rounded-full',
        '편집 디자이너': 'text-darkgray text-[12px] rounded-full',
        '패키지 디자이너': 'text-darkgray text-[12px] rounded-full',
        '전시 디자이너': 'text-darkgray text-[12px] rounded-full',
        컬러리스트: 'text-darkgray text-[12px] rounded-full',
        클래식: 'text-darkgray text-[12px] rounded-full',
        JAZZ: 'text-darkgray text-[12px] rounded-full',
        CCM: 'text-darkgray text-[12px] rounded-full',
        팝: 'text-darkgray text-[12px] rounded-full',
        발라드: 'text-darkgray text-[12px] rounded-full',
        블루스: 'text-darkgray text-[12px] rounded-full',
        힙합: 'text-darkgray text-[12px] rounded-full',
        '컨트리 뮤직': 'text-darkgray text-[12px] rounded-full',
        '포크 음악': 'text-darkgray text-[12px] rounded-full',
        레게: 'text-darkgray text-[12px] rounded-full',
        디스코: 'text-darkgray text-[12px] rounded-full',
        '록 음악': 'text-darkgray text-[12px] rounded-full',
        '전자 음악': 'text-darkgray text-[12px] rounded-full',
        트로트: 'text-darkgray text-[12px] rounded-full',
        '일렉트로닉 뮤직': 'text-darkgray text-[12px] rounded-full',
        로큰롤: 'text-darkgray text-[12px] rounded-full',

        // 프로그래머 스킬
        React: 'text-darkgray text-[12px] rounded-full',
        TypeScript: 'text-darkgray text-[12px] rounded-full',
        JavaScript: 'text-darkgray text-[12px] rounded-full',
        'Node.js': 'text-darkgray text-[12px] rounded-full',
        'Express.js': 'text-darkgray text-[12px] rounded-full',
        Python: 'text-darkgray text-[12px] rounded-full',
        Django: 'text-darkgray text-[12px] rounded-full',
        Flask: 'text-darkgray text-[12px] rounded-full',
        'Ruby on Rails': 'text-darkgray text-[12px] rounded-full',
        Java: 'text-darkgray text-[12px] rounded-full',
        'Spring Boot': 'text-darkgray text-[12px] rounded-full',
        'C++': 'text-darkgray text-[12px] rounded-full',
        'C#': 'text-darkgray text-[12px] rounded-full',
        Go: 'text-darkgray text-[12px] rounded-full',
        Rust: 'text-darkgray text-[12px] rounded-full',
        GraphQL: 'text-darkgray text-[12px] rounded-full',
        MongoDB: 'text-darkgray text-[12px] rounded-full',
        MySQL: 'text-darkgray text-[12px] rounded-full',
        PostgreSQL: 'text-darkgray text-[12px] rounded-full',
        Docker: 'text-darkgray text-[12px] rounded-full',

        // 아티스트 스킬
        'Music Theory': 'text-darkgray text-[12px] rounded-full',
        'Audio Mixing': 'text-darkgray text-[12px] rounded-full',
        'Audio Mastering': 'text-darkgray text-[12px] rounded-full',
        'Sound Design': 'text-darkgray text-[12px] rounded-full',
        Composing: 'text-darkgray text-[12px] rounded-full',
        Arranging: 'text-darkgray text-[12px] rounded-full',
        'Music Production': 'text-darkgray text-[12px] rounded-full',
        'Digital Audio Workstations (DAWs)':
          'text-darkgray text-[12px] rounded-full',
        'Ableton Live': 'text-darkgray text-[12px] rounded-full',
        'FL Studio': 'text-darkgray text-[12px] rounded-full',
        'Logic Pro': 'text-darkgray text-[12px] rounded-full',
        'Pro Tools': 'text-darkgray text-[12px] rounded-full',
        Cubase: 'text-darkgray text-[12px] rounded-full',
        Melodyne: 'text-darkgray text-[12px] rounded-full',
        Sampling: 'text-darkgray text-[12px] rounded-full',
        'MIDI Programming': 'text-darkgray text-[12px] rounded-full',
        Synthesizers: 'text-darkgray text-[12px] rounded-full',
        'Vocal Tuning': 'text-darkgray text-[12px] rounded-full',
        'Field Recording': 'text-darkgray text-[12px] rounded-full',
        'Game Audio Implementation': 'text-darkgray text-[12px] rounded-full',

        // 디자이너 스킬
        'UX/UI Design': 'text-darkgray text-[12px] rounded-full',
        'Visual Design': 'text-darkgray text-[12px] rounded-full',
        Wireframing: 'text-darkgray text-[12px] rounded-full',
        Prototyping: 'text-darkgray text-[12px] rounded-full',
        'Interaction Design': 'text-darkgray text-[12px] rounded-full',
        'Adobe Photoshop': 'text-darkgray text-[12px] rounded-full',
        'Adobe Illustrator': 'text-darkgray text-[12px] rounded-full',
        'Adobe XD': 'text-darkgray text-[12px] rounded-full',
        Figma: 'text-darkgray text-[12px] rounded-full',
        Sketch: 'text-darkgray text-[12px] rounded-full',
        'Motion Graphics': 'text-darkgray text-[12px] rounded-full',
        'After Effects': 'text-darkgray text-[12px] rounded-full',
        'Brand Identity Design': 'text-darkgray text-[12px] rounded-full',
        Typography: 'text-darkgray text-[12px] rounded-full',
        '3D Modeling': 'text-darkgray text-[12px] rounded-full',
        Blender: 'text-darkgray text-[12px] rounded-full',
        'Cinema 4D': 'text-darkgray text-[12px] rounded-full',
        'Web Design': 'text-darkgray text-[12px] rounded-full',
        'Responsive Design': 'text-darkgray text-[12px] rounded-full',
        'Design Systems': 'text-darkgray text-[12px] rounded-full',
      },
    },

    defaultVariants: {
      type: 'roleTag',
    },
  }
);

const Tag: React.FC<TagProps> = ({ label, type, variant }) => {
  return <span className={cn(tagStyles({ type, variant }))}>{label}</span>;
};

export default Tag;
