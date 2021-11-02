import { Dispatch } from 'store';
// copy内容到剪贴板
export const copyContent = (content: string) => {
  const oInput = document.createElement('input');
  oInput.value = content;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand("Copy"); // 执行浏览器复制命令
  oInput.className = 'oInput';
  oInput.style.display = 'none';
  Dispatch.toast.show({ type: 'success', text: '复制成功！' });
}