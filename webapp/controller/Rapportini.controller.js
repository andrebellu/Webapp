sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast",
        "sap/ui/model/json/JSONModel",
        "sap/ui/unified/DateRange",
        "sap/ui/core/format/DateFormat",
        "sap/ui/core/library",
    ],
    function (
        Controller,
        MessageToast,
        JSONModel,
        DateRange,
        DateFormat,
        coreLibrary
    ) {
        "use strict";

        var CalendarType = coreLibrary.CalendarType;

        return Controller.extend(
            "sap.ui.demo.walkthrough.controller.Rapportini",
            {
                oFormatYyyymmdd: null,

                onInit: function (evt) {
                    // set explored app's demo model on this sample
                    var oModel = new JSONModel("model/data.json");
                    this.getView().setModel(oModel);
                    this.oFormatYyyymmdd = DateFormat.getInstance({
                        pattern: "yyyy-MM-dd",
                        calendarType: CalendarType.Gregorian,
                    });
                },

                handleSwipe: function (evt) {
                    // register swipe event
                    var oSwipeContent = evt.getParameter("swipeContent"), // get swiped content from event
                        oSwipeDirection = evt.getParameter("swipeDirection"); // get swiped direction from event
                    var msg = "";

                    if (oSwipeDirection === "BeginToEnd") {
                        // List item is approved, change swipeContent(button) text to Disapprove and type to Reject
                        oSwipeContent.setText("Approve").setType("Accept");
                        msg =
                            "Swipe direction is from the beginning to the end (left ro right in LTR languages)";
                    } else {
                        // List item is not approved, change swipeContent(button) text to Approve and type to Accept
                        oSwipeContent.setText("Disapprove").setType("Reject");
                        msg =
                            "Swipe direction is from the end to the beginning (right to left in LTR languages)";
                    }
                    MessageToast.show(msg);
                },

                handleEdit: function () {
                    MessageToast.show("Edit button pressed");
                },

                clicked: function () {
                    MessageToast.show("ciao");
                },
                handleSelectToday: function (oEvent) {
                    var oCalendar = this.byId("calendar");
                    oCalendar.removeAllSelectedDates();
                    oCalendar.addSelectedDate(
                        new DateRange({ startDate: new Date() })
                    );
                    this._updateText(oCalendar);
                },
                openDatePicker: function (oEvent) {
                    this.getView()
                        .byId("HiddenDP")
                        .openBy(oEvent.getSource().getDomRef());
                },
                changeDateHandler: function (oEvent) {
                    MessageToast.show(
                        "Date selected: " + oEvent.getParameter("value")
                    );
                },
                handleHomeIconPress: function(oEvent) {
                    MessageToast.show("Home icon pressed");
                }
            }
        );
    }
);