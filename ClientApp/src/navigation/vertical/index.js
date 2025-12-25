// ** Navigation imports
import apps from './apps'
import charts from './charts'
import forms from './forms'
/*import others from './others'
import pages from './pages'*/

// ** Merge & Export
/*export default [...apps]*/


export default [...(localStorage.getItem("urole") === String(7) ? apps : localStorage.getItem("urole") === String(90) ? charts : forms)]
