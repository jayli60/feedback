export class Utility {
      //ToDo: use npm guid library
      static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
        }).replace(/-/g, "_").toUpperCase();
      }

      static calculateDistance(latitude1 : number, longitude1 : number, latitude2 : number, longitude2 : number) : number
      {
          var R = 6371; // Radius of the earth in km
          var dLat = this.deg2rad(latitude1 - latitude2);  // deg2rad below
          var dLon = this.deg2rad(longitude1 - longitude2); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(latitude1)) * Math.cos(this.deg2rad(latitude2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c; // Distance in km
          return this.KM2Mile(d);    
      }
  
      static deg2rad(deg : number) : number {
          return deg * (Math.PI/180)
      }

      static KM2Mile(km : number) : number
      {
        return km * 0.621371;
      }
        
}