import Hr from '@/components/ui/Hr';
import Card from '@/components/ui/Card';
import useImageUpload, {
  type UseImageUploadResult,
} from '@/hooks/useImageUpload/v2';
import FormImageUpload from '@/components/ui/form/v2/FormImageUpload';
import AvatarCrop from './AvatarCrop';

import classes from './SettingsPanel.module.scss';

const AvatarEdit = ({ currentAvatar }: { currentAvatar: string }) => {
  const submitNewAvatar = (event: any) => {
    event.preventDefault();
    console.log('submitNewAvatar');
  };

  const avatarUpload = useImageUpload({
    initialData: currentAvatar,
  });

  return (
    <Card>
      <h1 className="text-lg font-bold text-center my-2">Аватар</h1>
      <Hr width={'100%'} />
      <form className={classes.form}>
        <FormImageUpload upload={avatarUpload} onSave={submitNewAvatar} />
      </form>
      {avatarUpload.isTouched && <AvatarCrop src={avatarUpload.url} />}
    </Card>
  );
};
export default AvatarEdit;
