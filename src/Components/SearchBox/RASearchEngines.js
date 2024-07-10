import fetchJsonp from 'fetch-jsonp';
import IconConfig from './icon/IconConfig';

const RASearchEngines = [
    {
        "name":"Baidu",
        "placeholder":"使用百度搜索",
        "icon": IconConfig.baidu,
        "suggester": function(keyword){
            const url = `//suggestion.baidu.com/su?wd=${keyword}`;
            return (fetchJsonp(url, { jsonpCallback: "cb"}).then((res) => {
                return res.json();
            }).catch(e => {
                return Promise.reject(e);
            })).then(jsonObj=>{
                return Promise.resolve(jsonObj && jsonObj.s ? jsonObj.s : []);
            }).catch(e=>{
                return Promise.reject(e);
            });
        },
        "searcher":function(keyword){
            return `https://www.baidu.com/s?wd=${keyword}`;
        }
    },
    {
        "name":"Google",
        "icon":IconConfig.google,
        "placeholder":"使用Google搜索",
        "suggester": function(keyword){
            const url = `//suggestqueries.google.com/complete/search?client=firefox&q=${keyword}&callback=searchHandler`;
            return (fetchJsonp(url, { jsonpCallback: "callback"}).then((res) => {
                return res.json();
            }).catch(e => {
                return Promise.reject(e);
            })).then(jsonObj=>{
                return Promise.resolve(jsonObj && Array.isArray(jsonObj) &&jsonObj.length >= 1 ? jsonObj[1] : []);
            }).catch(e=>{
                return Promise.reject(e);
            });
        },
        "searcher":function(keyword){
            return `https://www.google.com/search?q=${keyword}`;
        }
    },
];

export default RASearchEngines;