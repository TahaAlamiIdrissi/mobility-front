<template>
  <v-app>
    <div id="map">
      <!--In the following div the HERE Map will render-->
      <div
        id="mapContainer"
        style="height: 600px; width: 100%"
        class="map"
        ref="hereMap"
      ></div>
      <div class="text-center" data-app>
        <v-dialog v-model="dialog" width="500" v-if="this.student != null">
          <v-card>
            <v-card-title class="headline grey lighten-2">
              Id : {{ this.student.id }}
            </v-card-title>

            <v-card-text>
              <h3>Student Name :</h3>
              {{ this.student.studentName }}
              <h3>City :</h3>
              {{ this.student.city }}
              <h3>Country :</h3>
              {{ this.student.country }}
              <h3>Promotion :</h3>
              {{ this.student.promotion }}
              <h3>Starting Date :</h3>
              {{ this.student.startingDate }}
              <h3>Ending Date :</h3>
              {{ this.student.endingDate }}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn color="success" text @click="edit"> Edit </v-btn>
              <v-btn color="red" text @click="remove"> Delete </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-else>
          <v-card>
            <v-card-title class="headline grey lighten-2">
              There is no student here
            </v-card-title>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-app>
</template>

<script>
import mobilityService from "../services/MobilityService";

export default {
  name: "HereMap",
  props: {
    location: String,
    // center object { lat: 40.730610, lng: -73.935242 }
  },
  data() {
    return {
      platform: null,
      apikey: "YBdtZiwyexubG6hevn_kotWoEAeNh8dizs0F5wiT1Jg",
      geocoder: {},
      students: [],
      map: null,
      student: {},
      dialog: false,
      selectedItem: 1,
      items: [
        { text: "Real-Time", icon: "mdi-clock" },
        { text: "Audience", icon: "mdi-account" },
        { text: "Conversions", icon: "mdi-flag" },
      ],
      // You can get the API KEY from developer.here.com
    };
  },
  created() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey,
    });
    this.platform = platform;
    this.geocoder = this.platform.getGeocodingService();
  },
  async mounted() {
    await mobilityService.getMobilities("mobility/all").then((res) => {
      //console.log(res);
      res.data.forEach((element) => {
        element.startingDate = element.startingDate.split("T")[0];
        element.endingDate = element.endingDate.split("T")[0];
        if (element.state == true) {
          this.students.push(element);
        }else{
          console.log("Student with name :"+element.studentName+" is not validated")
        }
      });
    });
    this.initializeHereMap();
  },
  methods: {
    initializeHereMap() {
      // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      this.map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 0,
        // center object { lat: 40.730610, lng: -73.935242 }
      });
      addEventListener("resize", () => this.map.getViewPort().resize());
      this.students.forEach((e) => {
        this.geocoder.geocode(
          { searchText: e.city },
          (data) => {
            if (data.Response.View.length > 0) {
              if (data.Response.View[0].Result.length > 0) {
                var coords =
                  data.Response.View[0].Result[0].Location.DisplayPosition;
                this.map.addObject(
                  new window.H.map.Marker(
                    {
                      lat: coords.Latitude,
                      lng: coords.Longitude,
                    },
                    { data: e }
                  )
                );
              }
            }
          },
          (error) => {
            console.error(error);
          }
        );
      });

      var mapEvents = new H.mapevents.MapEvents(this.map);
      this.map.addEventListener("tap", (evt) => {
        // Now lets log the event
        console.log(evt.target.data);
        this.student = evt.target.data;
        this.dialog = true;
      });
      // add behavior control
      // add UI
      H.ui.UI.createDefault(this.map, maptypes);
      // End rendering the initial map
      new H.mapevents.Behavior(mapEvents);
    },
    edit() {
      console.log(this.student.id);
      this.$router.push({
        name: "Details",
        params: { studentId: this.student.id },
      });
    },
    remove() {
      mobilityService
        .removeMobility("mobility/remove/" + this.student.id)
        .then((res) => {
          console.log(res);
          this.dialog = false;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
#map {
  width: 60vw;
  min-width: 360px;
  text-align: center;
  margin: 5% auto;
  background-color: #ccc;
}
</style>