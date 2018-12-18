import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';

export default createMuiTheme({
  palette: {
    primary: orange,
    secondary: amber, // Indigo is probably a good match with pink
  }
});