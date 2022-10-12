import {connect} from 'react-redux';
import Toast from '../../shared/toast'

const mapProps = (state) => ({
  toast: state.toast,
});

const mapDispatch = (dispatch) => ({
  toastContent: dispatch.toast.toast_content_reducer,
  toastState: dispatch.toast.toast_state_reducer,
});

export default connect(mapProps, mapDispatch)(Toast);
