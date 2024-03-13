import { Alert } from "@mui/material";
import { hideApiMessageNotification, listState, Message } from "../list/list.slicer";
import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

function Toast (props: { apiResponseMessage: Message | null, hideApiMessage: any }) {
    const { apiResponseMessage, hideApiMessage } = props;
    const closeNotification = () => {
        setTimeout(() => {
            hideApiMessage()
        }, 3000)
    }

    if (apiResponseMessage?.show) {
        closeNotification()
    }

    return (
        <>
            { apiResponseMessage?.show
                    ?
                        <div className='app-notification'>
                            <Alert variant="filled" severity={apiResponseMessage?.type} onClose={() => closeNotification()}>
                                { apiResponseMessage?.message }
                            </Alert>
                        </div>
                    :
                        <></>
                }
        </>
    )
}

const mapStateToProps = (state: { list: listState }) => ({ apiResponseMessage: state.list.apiResponseMessage })
const mapDispatchToProps = (dispatch: Dispatch) => ({
    hideApiMessage: () => dispatch(hideApiMessageNotification())
})

export default connect(mapStateToProps, mapDispatchToProps)(Toast)