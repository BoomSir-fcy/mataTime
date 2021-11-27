interface ToastContextApi {
  toastError: ToastSignature;
  toastWarning: ToastSignature;
  toastSuccess: ToastSignature;
}

type ToastSignature = (
  title: Toast['title'],
  description?: Toast['description']
) => void;
