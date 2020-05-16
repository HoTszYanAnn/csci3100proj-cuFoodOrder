import React from 'react';
import './css/Navigation.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class NoticeBox extends React.Component {
// notice/ confirmation pop up box layout 
    render() {
        console.log()
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <DialogTitle id="responsive-dialog-title" margin="dense">{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.props.onClose} color="primary" variant="outlined">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default NoticeBox;