<template>
  <form @submit.prevent="update">
    <v-app id="inspire">
      <v-main>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12 rounded-xl">
                <v-toolbar color="dark" dark text>
                  <v-toolbar-title
                    >Edit {{ this.Mobility.studentName }}'s Mobility
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <!-- <span class="text-danger">{{
                      Error.EmailError ||
                      Error.Description ||
                      Error.ConfPassError
                    }}</span> -->
                    <v-text-field
                      label="Country"
                      name="country"
                      v-model="Mobility.country"
                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      label="City"
                      v-model="Mobility.city"
                      prepend-icon="mdi-email"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      id="Promotion"
                      label="promotion"
                      v-model="Mobility.promotion"
                      name="promotion"
                      prepend-icon="mdi-lock"
                    ></v-text-field>
                    <v-text-field
                      id="StudentName"
                      label="Name"
                      v-model="Mobility.studentName"
                      name="Name"
                      prepend-icon="mdi-lock"
                    ></v-text-field>
                    <div class="date-items">
                      <div class="first-date">
                        <v-flex xs12 sm6 md6>
                          <v-dialog
                            ref="dialog1"
                            v-model="modal"
                            :return-value.sync="Mobility.startingDate"
                            persistent
                            width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="Mobility.startingDate"
                                label="Starting Date"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="Mobility.startingDate"
                              scrollable
                            >
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="modal = false"
                                >Cancel</v-btn
                              >
                              <v-btn
                                text
                                color="primary"
                                @click="
                                  $refs.dialog1.save(Mobility.startingDate)
                                "
                                >OK</v-btn
                              >
                            </v-date-picker>
                          </v-dialog>
                        </v-flex>
                      </div>
                      <div class="second-date">
                        <v-flex xs12 sm6 md6>
                          <v-dialog
                            ref="dialog2"
                            v-model="modalEnding"
                            :return-value.sync="Mobility.endingDate"
                            persistent
                            width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="Mobility.endingDate"
                                label="Ending Date"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="Mobility.endingDate"
                              scrollable
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="modalEnding = false"
                                >Cancel</v-btn
                              >
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.dialog2.save(Mobility.endingDate)"
                                >OK</v-btn
                              >
                            </v-date-picker>
                          </v-dialog>
                        </v-flex>
                      </div>
                    </div>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <button class="btn" type="submit">Update</button>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </form>
</template>

<script>
import mobilityService from "../services/MobilityService";

export default {
  name: "Details",
  components: {},
  data() {
    return {
      Mobility: {},
      modal: false,
      modalEnding: false,
    };
  },
  mounted() {
    console.log(this.$route.params.studentId);
    mobilityService
      .getMobility("mobility/GetMobility/" + this.$route.params.studentId)
      .then((res) => {
        this.Mobility = res.data;
      });
  },
  methods: {
    update(){
       mobilityService
        .updateMobility("mobility/edit", this.Mobility)
        .then((res) => {
          console.log(res);
          this.$router.replace({
            name: "ListMobilities",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

<style  scoped>
.btn {
  color: white;
  background: rgb(22, 21, 21);
  padding: 10px;
  width: 25%;
  border-radius: 15px;
  font-weight: bold;
  font-size: 1.2em;
}
.date-items {
  display: flex;
}
</style>