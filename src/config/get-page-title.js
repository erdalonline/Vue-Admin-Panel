import store from '../store/store'
const  appTitle = store.getters.appName

export default function getTitle(title) {
    if(title){
        return title + ' - ' + appTitle
    }else{
        return appTitle
    }
}