import { observable, runInAction } from "mobx";
import Config from "./Config";

const RABookmarkList = observable({
    allBookMarks: [],
    isLoading: false,
    requestData() {
        const url = Config.url;
        this.isLoading = true;

        fetch(url).then((res) => {
            res.json().then(jsonObj => {
                runInAction(
                    () => {
                        let objectA = [];
                        let categories = jsonObj.categories;
                        let bookmarks = jsonObj.bookmarks;

                        categories.forEach(element => {
                            let theChildrens = bookmarks.filter((item) => item.categories.includes(element.id));

                            let theChildrensParse = [];
                            theChildrens.forEach(theChild => {

                                let nowChild = {
                                    "id": theChild.id,
                                    "type": "link",
                                    "title": theChild.name,
                                    "url": theChild.link,
                                    "logo": theChild.icon != null && theChild.icon.length > 0 ? theChild.icon : theChild.icon_third,
                                    "bgColor": "rgba(241, 243, 244, 1)",
                                    "bookmarks": []
                                };
                                theChildrensParse.push(nowChild);
                            });

                            let theDir = {
                                "id": element.id,
                                "type": "folder",
                                "title": element.name,
                                "url": element.link,
                                "logo": "",
                                "bgColor": "rgba(241, 243, 244, 1)",
                                "bookmarks": theChildrensParse
                            };

                            objectA.push(theDir);
                        });

                        let topSites = bookmarks.filter((item) => item.categories.length <= 0);
                        topSites.forEach(element => {
                            let topSite = {
                                "id": element.id,
                                "type": "link",
                                "title": element.name,
                                "url": element.link,
                                "logo": element.icon != null && element.icon.length > 0 ? element.icon : element.icon_third,
                                "bgColor": "rgba(241, 243, 244, 1)",
                                "bookmarks": []
                            };
                            objectA.push(topSite);
                        });
                        this.isLoading = false;
                        console.log(objectA)
                        this.allBookMarks = objectA;
                    });
            })
        }).catch(e => {
            console.log(e);
            runInAction(() => {
                this.isLoading = false;
            });
        });
    },
});


export default RABookmarkList;