trigger t1 on Account (before insert) {
    for(account a:trigger.new){
        if(a.Industry=='Technology'){
            a.Description='Technology Account';
        }
    }
}