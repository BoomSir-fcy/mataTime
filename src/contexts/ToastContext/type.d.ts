interface ToastContextApi {
  toastError: ToastSignature;
  toastWarning: ToastSignature;
  toastSuccess: ToastSignature;
  toastInfo: ToastSignature;
}

type ToastSignature = (
  title: Toast['title'],
  description?: Toast['description']
) => void;
