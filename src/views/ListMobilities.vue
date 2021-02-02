<template>
  <v-app>
    <v-data-table
      data-app
      :headers="headers"
      :items="students"
      class="table"
      :items-per-page="6"
      @click:row="handleClick"
    >
      <template v-slot:[`item.state`]="{ item }">
        <v-chip :color="getColor(item.state)" dark>
          {{ item.state }}
        </v-chip>
      </template>
    </v-data-table>
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
            <v-btn color="primary" text @click="edit"> Edit </v-btn>
            <v-btn color="red" text @click="remove"> Delete </v-btn>
            <v-btn
              color="success"
              text
              v-if="this.student.state == false"
              @click="validate"
            >
              Validate
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="grey" text @click="dialog = false"> Close </v-btn>
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
            <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src
import mobilityService from "../services/MobilityService";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  name: "ListMobilities",
  components: {},
  data() {
    return {
      dialog: false,
      student: null,
      headers: [
        {
          text: "Students",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Country", value: "country" },
        { text: "City", value: "city" },
        { text: "Name", value: "studentName" },
        { text: "Promo", value: "promotion" },
        { text: "Starts", value: "startingDate" },
        { text: "Ends", value: "endingDate" },
        { text: "Submission", value: "submissionDate" },
        { text: "State", value: "state" },
      ],
      students: [],
    };
  },
  mounted() {
    mobilityService.getMobilities("mobility/all").then((res) => {
      //console.log(res);
      res.data.forEach((element) => {
        element.startingDate = element.startingDate.split("T")[0];
        element.endingDate = element.endingDate.split("T")[0];
        element.submissionDate = element.submissionDate.split("T")[0];
        // if (element.state == false) {
        //   element.state = "Not valid";
        // } else {
        //   element.state = "Valid";
        // }
      });
      this.students = res.data;
      console.log(this.students);
    });
  },
  methods: {
    getColor(state) {
      if (state === false) return "red";
      else return "green";
    },
    handleClick(value) {
      this.student = value;
      this.dialog = true;
    },
    edit() {
      console.log(this.student.id);
      this.$router.push({
        name: "Details",
        params: { studentId: this.student.id },
      });
    },
    remove() {
      this.$swal({
        title: "Delete this student ?",
        text: "Are you sure? You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete it!",
      }).then((result) => {
        // <--
        if (result.value) {
          mobilityService
            .removeMobility("mobility/remove/" + this.student.id)
            .then((res) => {
              console.log(res);
              this.students = this.students.filter(
                (p) => p.id != this.student.id
              );
              this.dialog = false;
            })
            .catch((err) => console.log(err));
        }
      });
    },
    validate() {
      mobilityService
        .validateMobility("mobility/validate/" + this.student.id)
        .then((res) => {
          console.log(res);
          let thisState = this.students.find((e) => e.id === this.student.id);
          thisState.state = !thisState.state;
          //   if (thisState.state == false) {
          //   thisState.state = "Not valid";
          // } else {
          //   thisState.state = "Valid";
          // }
          this.dialog = false;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.table {
  margin-top: 5%;
}
</style>