import AddHardSkill from "./AddHardSkill";
import AddSoftSkill from "./AddSoftSkill";
import HardSkills from "./HardSkills";
import SoftSkills from "./SoftSkills";
import Stage4Tips from "./Stage4Tips";

export default function Stage4() {
  return (
    <div className="space-y-4">
      <AddHardSkill />
      <HardSkills />
      <AddSoftSkill />
      <SoftSkills />
      <Stage4Tips />
    </div>
  );
}
