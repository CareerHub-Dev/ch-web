import StudentState from '@/models/Student/StudentState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

type StudentStore = {
  profileData: StudentState;
  group: string;
  photo: string;
};

const initialStudentState: StudentState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  groupId: '',
  birthDate: '',
};

const initialStudentStoreState: StudentStore = {
  profileData: initialStudentState,
  photo: '',
  group: '',
};

const studentStateSlice = createSlice({
  name: 'cvConstructor',
  initialState: initialStudentStoreState,
  reducers: {
    setProfileData: (state, action: PayloadAction<StudentState>) => {
      state.profileData = action.payload;
    },
  },
});

export const selectProfileData = (state: RootState) =>
  state.student.profileData;

export const selectProfilePhoto = (state: RootState) => state.student.photo;

export default studentStateSlice.reducer;

export const { setProfileData } = studentStateSlice.actions;
