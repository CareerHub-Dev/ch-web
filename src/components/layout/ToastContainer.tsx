import { ToastContainer as Container } from 'react-toastify';

const ToastContainer = () => {
  return (
    <Container
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{ zIndex: 1000 }}
    />
  );
};
export default ToastContainer;
