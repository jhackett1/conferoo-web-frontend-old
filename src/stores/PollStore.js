import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class PollsStore extends EventEmitter {
  constructor(){
    super();
    this.polls = [];
    this.loading = true;
  }

  getPolls(){
    return this.polls;
  }
  getLoading(){
    return this.loading;
  }

  fetchPolls(polls){
    this.polls = polls;
    this.loading = false;
    this.emit('change');
  }

  updateResponses(updatedPoll){
    // console.log(updatedPoll)
    // Look through the polls for one with the same ID, then update it
    for(var i in this.polls){
      if (this.polls[i]._id === updatedPoll._id) {
        this.polls[i] = updatedPoll;
        this.emit('change');
      }
    }
  }

  handleActions(action){
    switch(action.type){
      case "FETCH_POLLS_SUCCESS":
        console.log("FETCH_POLLS_SUCCESS event dispatched")
        this.fetchPolls(action.polls)
        break;

      case "RESPONDING_TO_POLL_SUCCESS":
        console.log("RESPONDING_TO_POLL_SUCCESS event dispatched")
        this.updateResponses(action.poll)
        break;

      default:
        break;
    }
  }

}

const pollsStore = new PollsStore;
dispatcher.register(pollsStore.handleActions.bind(pollsStore));

window.pollsStore = pollsStore;

export default pollsStore;
