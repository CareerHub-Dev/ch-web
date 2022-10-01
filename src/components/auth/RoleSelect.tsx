import UserRole from '@/models/enums/UserRole';
import { RefObject } from 'react';
import classes from './AuthField.module.scss';

const RoleSelect: React.FC<{
  id: string;
  ref: RefObject<HTMLSelectElement>;
}> = ({ id, ref }) => {
  return (
    <div id={`${id}SelectDiv`} className={classes.root}>
      <select id={`${id}Select`} ref={ref} className={classes.field}>
        <option value={UserRole.Student}>Я Студент</option>
        <option value={UserRole.Company}>Я Представник компанії</option>
      </select>
    </div>
  );
};
export default RoleSelect;
