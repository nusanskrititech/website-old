// Format SatSchedule
class scheduleEvent {
    constructor(title, date, start, end, track) {
        this.title = title;
        this.startTime = start;
        this.date = date;
        this.endTime = end;
        this.track = track;
        // if (track == undefined){
        //   this.end = null
        //   this.track = end;
        // }
        // else{
          this.endTime = end;
          this.track = track;
        // }
        
    }

}

var saturday = [];
var sunday = [];

// // track = {main, ws} where ws is workshop
// saturday.push(new scheduleEvent("Check-In Opens", "March 3", "main"));
// saturday.push(new scheduleEvent("Hacking Begins", "March 2", "main"));
// saturday.push(new scheduleEvent("Opening Ceremony", "March 6", "main"));
saturday.push(new scheduleEvent("Mehfil","March 3", "08:00 PM", "11:00 PM", "ws"));
saturday.push(new scheduleEvent("Movie","March 4", "09:00 PM", "11:30 PM", "ws"));
saturday.push(new scheduleEvent("Mehendi","March 8", "08:00 PM", "11:00 PM", "ws"));
saturday.push(new scheduleEvent("HOLI","March 12", "12:00 PM", "03:00 PM", "ws"));
saturday.push(new scheduleEvent("ASISH CHUGH(CEM)","March 13", "12:00 PM", "01:15 PM", "ws"));
saturday.push(new scheduleEvent("Alumni Panel Talk","March 14", "08:30 PM", "11:00 PM", "ws"));
saturday.push(new scheduleEvent("Vimal Kapur(CEM)","March 16", "06:00 PM", "07:00 PM", "ws"));
saturday.push(new scheduleEvent("VIVEK SHARMA(CEM)","March 17", "07:00 PM", "08:00 PM", "ws"));
saturday.push(new scheduleEvent("Ethnic day + Antakshari","March 18", "12:00 PM", "05:00 PM", "ws"));
saturday.push(new scheduleEvent("ART DAY","March 22", "12:00 PM", "06:00 PM", "ws"));
saturday.push(new scheduleEvent("TARANG","March 24", "07:00 PM", "11:45 PM", "ws"));
saturday.push(new scheduleEvent("Ram Navmi","March 31", "06:00", "08:00", "ws"));
// sunday.push(new scheduleEvent("Introduction to Electronics","March 6", "12:15", "13:15", "ws"));
// saturday.push(new scheduleEvent("LUNCH", "13:00", "main"));
// saturday.push(new scheduleEvent("Coding Challenge by BlackRock", "13:30", "14:30", "ws"));
// saturday.push(new scheduleEvent("Entreprenuership workshop by Edinburgh Innovations", "15:00", "16:00", "ws"));
// saturday.push(new scheduleEvent("Workshop by Nexmo", "17:00", "18:00", "ws"));
// saturday.push(new scheduleEvent("Dinner", "19:00", "main"));
// saturday.push(new scheduleEvent("Werewolf (Social)", "20:00", "21:00", "ws"));
// saturday.push(new scheduleEvent("Sleep Drop-In Begins", "21:00", "main"));
// sunday.push(new scheduleEvent("Pizza!!", "00:00", "main"));
// sunday.push(new scheduleEvent("Hacking Ends", "12:00", "main"));
// sunday.push(new scheduleEvent("Breakfast", "08:00", "main"));
// sunday.push(new scheduleEvent("Lunch", "12:00", "main"));
// sunday.push(new scheduleEvent("Judging Commences", "13:15", "14:30", "main"));
// sunday.push(new scheduleEvent("Closing Ceremony", "15:00", "16:00", "main"));
// sunday.push(new scheduleEvent("Venue closed", "17:00", "main"));
// sunday.push(new scheduleEvent("No workshops today", "00:00", "17:00", "ws"));

//saturday.sort((a,b) => (a.startTime >= b.startTime) ? 1: -1);
//sunday.sort((a,b) => (a.startTime >= b.startTime) ? 1 : -1 );

var str = '<tbody>';
str +=  '<tr><th></th><th>Event</th><th>Timing</th><th></th></tr>';
saturday.forEach(function(ev, index){
 
    str += '<tr>';
    str += '<td>' + saturday[index].date+ '</td>';
    str += '<td>' + saturday[index].title+ '</td>';
    str += '<th>';
    str+=saturday[index].startTime
  
    str +=  '<br />|<br />' + saturday[index].endTime;
    str += '</th>';
  str+="<th></th>";
  str += '</tr>';

  // }
// }

});
str += '</tbody>';
window.document.getElementById("saturdayContainer").innerHTML = str;

var str = '<tbody>';
str +=  '<tr><th></th><th>Event</th><th></th><th>Timing</th></tr>';
sunday.forEach(function(ev, index){
  if (index ==0  || (sunday[index-1].startTime != ev.startTime || sunday[index-1].track == ev.track) ){     
    str += '<tr>';
    if (ev.track == 'ws'){

        str += '<th></th>';
        str += '<td></td>';
    }
    
    

  str += '<th>';

  str += ev.startTime 
  if (ev.endTime){
    str+='<br />|<br />' + ev.endTime;
  }
  str += '</th>';
  str += '<td>';
  str += ev.title + '';
  str += '</td>';
  
  if (ev.track == 'main'){
    if (index != sunday.length-1 && ev.startTime == sunday[index+1].startTime && ev.track != sunday[index+1].track){
        str += '<th>';
        str+=sunday[index+1].startTime
        if(sunday[index+1].endTime){
        str +=  '<br />|<br />' + sunday[index+1].endTime;
      }
    
  str += '</th>';
  str += '<td>' + sunday[index+1].title+ '</td>';
    
  }
  else{
  str +='<th></th>';
  str += '<td></td>';
  }}
  
  str += '</tr>';
  
  }

});
str += '</tbody>';
window.document.getElementById("sundayContainer").innerHTML = str;