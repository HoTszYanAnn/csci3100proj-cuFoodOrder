import React from 'react';
import { withStyles  } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import image from '../img/cuhk.jpeg';

const styles = theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class RestaurantCard extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            expanded : false
        }
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }
    
    handleExpandClick = () => {
        console.log(this.state.expanded);
        this.setState({ expanded: !this.state.expanded });
    };
    
    render(){

    const {classes} = this.props;
    console.log(this.props);
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        A
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" component={RouterLink} to={{pathname: `/restaurants/${this.props.linkName}`}}>
                        <RestaurantIcon />
                    </IconButton>
                }
                title={this.props.restName}
                subheader={this.props.updateDate}
            />
            <CardMedia
                className={classes.media}
                image={image}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {this.props.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                    <div>{this.props.like}</div>
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <div>Menu:</div>
                    {this.props.bestItems.map((bestItem) =>
                    <Grid container justify="space-between" key={bestItem._id}>
                        <Grid item>{bestItem.dish}</Grid>
                        <Grid item>${bestItem.price}</Grid>
                    </Grid>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
}
}

RestaurantCard.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(RestaurantCard);