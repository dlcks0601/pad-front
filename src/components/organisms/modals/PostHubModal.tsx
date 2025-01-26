import * as React from 'react';
import {
  HubSelect,
  SkillSelect,
} from '@/components/atoms/contents/ContentsSelect';
import Icon from '@/components/atoms/Icon';
import Modal2 from '@/components/molecules/Modal';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import TiptapEditor from '@/components/organisms/TiptapEditor';
import useHubStore from '@/store/postHubStore';

import WorkTypeSelcet from '@/components/atoms/selects/WorkTypeSelect';
import DurationSelect from '@/components/atoms/selects/DurationSelect';
import HubCategorySelect from '@/components/atoms/selects/HubCategorySelect';
import StartDateSelect from '@/components/atoms/selects/StartDateSelect';

interface PostHubModalProps {
  onClose: () => void;
  onSubmit: () => void;
  onRevise?: boolean;
}

const PostHubModal = ({ onClose, onSubmit, onRevise }: PostHubModalProps) => {
  const {
    title,
    content,

    skills,
    detail_roles,
    setTitle,
    setContent,
    setStartDate,

    setSkills,
    setDetailRoles,
  } = useHubStore((state) => state);

  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);

  const handleUnitSelect = (unit: string) => {
    if (!selectedUnits.includes(unit)) {
      setSelectedUnits((prev) => [...prev, unit]);
    }
  };

  const handleUnitRemove = (unit: string) => {
    setSelectedUnits((prev) => prev.filter((u) => u !== unit));
  };

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSkillSelect = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills((prev) => [...prev, skill]);
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };

  const [date, setDate] = React.useState<Date>();

  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const [errors] = useState<{
    content: boolean;
  }>({
    content: false,
  });

  return (
    <Modal2 onClose={onClose}>
      <Modal2.Title>새 허브</Modal2.Title>
      <div className='flex flex-col items-start w-full gap-[20px]'>
        {currentStep === 1 && (
          <>
            <div className='flex flex-col items-start w-full gap-[5px]'>
              <div className='flex text-[20px] font-semibold'>제목</div>
              <Input
                type='text'
                value={title}
                placeholder='제목을 입력해주세요.'
                onChange={(e) => setTitle(e.target.value)}
                className='w-full border border-black h-[44px] px-2'
              />
            </div>
            <div className='flex flex-col items-start w-full gap-[5px]'>
              <div className='flex text-[20px] font-semibold'>직군</div>
              <HubSelect
                className='border-black'
                onUnitSelect={handleUnitSelect}
              />
            </div>
            <div className='flex border w-full border-black rounded-sm h-[44px]'>
              <div className='flex items-center px-[10px] py-[10px] gap-[10px]'>
                {selectedUnits.length === 0 ? (
                  <span className='text-[12px] text-[#FF6868]'>
                    직군을 선택해주세요.
                  </span>
                ) : (
                  selectedUnits.map((unit) => (
                    <div
                      key={unit}
                      className='flex text-[12px] items-center px-2 py-1 bg-[#EAEAEA] rounded-sm'
                    >
                      <span className='mr-1'>{unit}</span>
                      <button
                        className='text-black '
                        onClick={() => handleUnitRemove(unit)}
                      >
                        <Icon
                          type='xmark'
                          color='black'
                          className='w-[18px] h-[18px]'
                        />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className='flex flex-col items-start w-full gap-[5px]'>
              <div className='flex text-[20px] font-semibold'>스킬</div>
              <SkillSelect onSkillSelect={handleSkillSelect} />
            </div>
            <div className='flex border w-full border-black rounded-sm h-[44px]'>
              <div className='flex items-center px-[10px] py-[10px] gap-[10px]'>
                {selectedSkills.length === 0 ? (
                  <span className='text-[12px] text-[#FF6868]'>
                    스킬을 선택해주세요.
                  </span>
                ) : (
                  selectedSkills.map((skill) => (
                    <div
                      key={skill}
                      className='flex text-[12px] items-center px-2 py-1 bg-[#EAEAEA] rounded-sm'
                    >
                      <span className='mr-1'>{skill}</span>
                      <button
                        className='text-black'
                        onClick={() => handleSkillRemove(skill)}
                      >
                        <Icon
                          type='xmark'
                          color='black'
                          className='w-[18px] h-[18px]'
                        />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className='flex gap-[20px]'>
              <div className='flex flex-col items-start w-full gap-[5px]'>
                <div className='flex text-[20px] font-semibold'>
                  시작 희망일
                </div>
                <StartDateSelect />
              </div>
              <div className='flex flex-col items-start w-full gap-[5px]'>
                <div className='flex text-[20px] font-semibold'>기간</div>
                <div className='flex items-center gap-2'>
                  <DurationSelect />
                </div>
              </div>
            </div>

            <div className='flex gap-[20px]'>
              <div className='flex flex-col items-start w-full gap-[5px]'>
                <div className='flex text-[20px] font-semibold'>허브 유형</div>
                <HubCategorySelect />
              </div>
              <div className='flex flex-col items-start w-full gap-[5px]'>
                <div className='flex text-[20px] font-semibold'>작업 방식</div>
                <WorkTypeSelcet />
              </div>
            </div>

            <div className='flex w-full justify-end'>
              <div className='flex gap-[10px]'>
                <button className='w-[50px] h-[35px] text-[14px] bg-[#FF5E5E] text-white rounded'>
                  취소
                </button>
                <button
                  className='w-[50px] h-[35px] text-[14px] bg-[#00C859] text-white rounded'
                  onClick={handleNextStep}
                >
                  다음
                </button>
              </div>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div className='flex flex-col items-start w-full h-full gap-[10px]'>
              <div className='flex text-[20px] font-semibold'>허브 소개</div>
              <div className='flex flex-col w-full px-[10px] py-[20px] h-[573px] overflow-y-scroll scrollbar-hide border rounded-md border-black'>
                <TiptapEditor content={content} setContent={setContent} />
                {errors.content && (
                  <p className='flex flex-col text-red-600 text-[14px] mt-5 absolute'>
                    내용을 작성해주세요.
                  </p>
                )}
              </div>
              <div className='flex w-full justify-end'>
                <div className='flex gap-[10px]'>
                  <button
                    className='w-[50px] h-[35px] text-[14px] bg-[#FF5E5E] text-white rounded'
                    onClick={handlePrevStep}
                  >
                    이전
                  </button>
                  <button
                    className='w-[50px] h-[35px] text-[14px] bg-[#00C859] text-white rounded'
                    onClick={onSubmit}
                  >
                    완료
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal2>
  );
};

export default PostHubModal;
