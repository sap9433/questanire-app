import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';

export default createMuiTheme({
  palette: {
    primary: yellow,
    secondary: green, // Indigo is probably a good match with pink
    third: green
  }
});