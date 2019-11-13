export default class BaiHat{
    constructor(ten,casi,image,id,key,linkGoc,linkLyric,linkStream,kbit){
        this.tenBH=ten;
        this.caSi=casi;
        this.image=image;
        this.id=id;
        this.key=key;
        this.linkGoc=linkGoc;
        this.linkLyric=linkLyric;
        this.linkStream=linkStream;
        this.kbit=kbit;
    }
    constructor(linkGoc){
        this.linkGoc=linkGoc;
    }
    
    getInforBaiHat(){
        if(this.linkGoc==='')
            return;
        //else
        if (this.linkGoc.includes('nhaccuatui')){

        }
        else if (this.linkGoc.includes('soundcloud')){

        }
        else if (this.linkGoc.includes('zing') && this.linkGoc.includes('.vn')){

        }
    }

    getLinkStream(){
        if(this.linkStream!=='')
            return this.linkStream;
        else{
            if (this.linkGoc === '')
                return '';
            else{
                this.getInforBaiHat();
                return this.linkStream; //co the === '' neu khong tim thay
            }
        }
    }
}