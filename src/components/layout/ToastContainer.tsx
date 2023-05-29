import { ToastContainer as Container } from "react-toastify";

const ToastContainer = () => {
  return (
    <Container
      position="bottom-right"
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
