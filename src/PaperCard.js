import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const options = [
    'Edit',
    'Delete',
  ];

  const ITEM_HEIGHT = 40;

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
});

class PaperCard extends React.Component {

    state = {
        anchorEl: null,
      };
    
      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

      edit=()=>{
        alert("Edit")
      }
  render() {

    const { classes } = this.props;
 const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <Card className={classes.card}>
        <CardHeader
          
          action={
            <IconButton aria-label="More"
            aria-owns={open ? 'long-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}>
              <MoreVertIcon />
              <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 100,
            },
          }}
        >
            
            <option onClick={this.edit}>Grapefruit</option>
            <option >Delete</option>
            
        </Menu>
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
        />
       
        <CardContent>
          <Typography component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

PaperCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperCard);
