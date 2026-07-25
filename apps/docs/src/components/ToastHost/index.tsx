import { Toast } from '@base/ui';

export function ToastHost() {
  const { toasts } = Toast.useManager();

  return (
    <Toast.Viewport>
      {toasts.map(toast => (
        <Toast.Root key={toast.id} toast={toast}>
          {toast.title && <Toast.Title />}
          {toast.description && <Toast.Description />}
        </Toast.Root>
      ))}
    </Toast.Viewport>
  );
}
