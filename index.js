import encrypt from "./encrypt"
export default {
    /**
     * 加密
     * @param data 数据
     */
    encode(data){
        encrypt.encode(data);
    },
    /**
     * 解密
     * @param str 密文字符串
     */
    decode(str){
        encrypt.decode(str);
    },
    /**
     * 文件转base64
     * @param file 文件流
     * @returns {Promise<any>}
     */
    fileToBase64(file){
        return new Promise(resolve => {
            let fileObj = new FileReader();
            fileObj.readAsDataURL(file);
            fileObj.onload = event=>{
                resolve(event.target.result);
            };
        });
    },
    /**
     * 多维数组根据条件查找元素的路径
     * @param options 数据源
     * @param criteria 查询条件
     * @param optionsOld 原始数据源
     * @param parent 当前元素的父级
     * @param resDataAll 返回结果
     * @param childName 子集字段名称
     * @returns {*}
     *
     * 使用：
     * this.findPath(data,{fieldId: "14000000"},"child")
     */
    findPath(options,criteria,optionsOld,parent,resDataAll,childName='child'){
        if(typeof optionsOld == 'string'){
            childName = optionsOld;
            optionsOld = null;
        }
        optionsOld = optionsOld || options;
        let resData = null;
        resDataAll = resDataAll || [];
        options.forEach(item=>{
            if(!resData){
                let bool = true;
                for(let key in criteria){
                    if(criteria[key] != item[key]){
                        bool = false;
                    };
                };
                if(bool){
                    resData = item;
                    resDataAll.unshift(item);
                    if(optionsOld && parent){
                        this.findPath(optionsOld,parent,optionsOld,null,resDataAll,childName);
                    }
                };
                if(item[childName] && item[childName].length > 0){
                    this.findPath(item[childName],criteria,optionsOld,item,resDataAll,childName);
                }
            };
        });
        if(resDataAll.length > 0){
            return resDataAll;
        }
        return null;
    }

}