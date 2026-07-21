export default function ConfirmDialog({ show, message, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Xác nhận</h5>
            <button type="button" className="btn-close" onClick={onCancel} />
          </div>
          <div className="modal-body">
            <p>{message || 'Bạn có chắc chắn muốn thực hiện thao tác này?'}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>
              Hủy
            </button>
            <button className="btn btn-warning" onClick={onConfirm}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
