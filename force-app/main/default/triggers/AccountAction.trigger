trigger AccountAction on Account (after insert,after update) {
    if(trigger.isinsert && trigger.isafter){
        AccountActionHandler.createContact(trigger.new);
    }
    if(trigger.isupdate && trigger.isafter){
      AccountActionHandler.createOpportunity(trigger.newmap,trigger.oldmap);
    }
}