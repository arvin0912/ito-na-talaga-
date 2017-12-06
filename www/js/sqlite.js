"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Calendar = function(_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);
    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
    _this.state = {
      selectedMonth: moment(),
      selectedDay: moment().startOf("day"),
      selectedMonthEvents: [],
      showEvents: false
    };
    _this.previous = _this.previous.bind(_this);
    _this.next = _this.next.bind(_this);
    _this.addEvent = _this.addEvent.bind(_this);
    _this.showCalendar = _this.showCalendar.bind(_this);
    _this.goToCurrentMonthView = _this.goToCurrentMonthView.bind(_this);
    _this.initialiseEvents();
    return _this;
  }
  Calendar.prototype.previous = function previous() {
    var currentMonthView = this.state.selectedMonth;
    this.setState({
      selectedMonth: currentMonthView.subtract(1, "month")
    });
  };
  Calendar.prototype.next = function next() {
    var currentMonthView = this.state.selectedMonth;
    this.setState({
      selectedMonth: currentMonthView.add(1, "month")
    });
  };
  Calendar.prototype.select = function select(day) {
    this.setState({
      selectedMonth: day.date,
      selectedDay: day.date.clone(),
      showEvents: true
    });
  };
  Calendar.prototype.goToCurrentMonthView = function goToCurrentMonthView() {
    var currentMonthView = this.state.selectedMonth;
    this.setState({
      selectedMonth: moment()
    });
  };
  Calendar.prototype.showCalendar = function showCalendar() {
    this.setState({
      selectedMonth: this.state.selectedMonth,
      selectedDay: this.state.selectedDay,
      showEvents: false
    });
  };
  Calendar.prototype.renderMonthLabel = function renderMonthLabel() {
    var currentMonthView = this.state.selectedMonth;
    return React.createElement("span", {
      className: "box month-label"
    }, currentMonthView.format("MMMM YYYY"));
  };
  Calendar.prototype.renderDayLabel = function renderDayLabel() {
    var currentSelectedDay = this.state.selectedDay;
    return React.createElement("span", {
      className: "box month-label"
    }, currentSelectedDay.format("DD MMMM YYYY"));
  };
  Calendar.prototype.renderTodayLabel = function renderTodayLabel() {
    var currentSelectedDay = this.state.selectedDay;
    return React.createElement("span", {
      className: "box today-label",
      onClick: this.goToCurrentMonthView
    }, "Today");
  };
  Calendar.prototype.renderWeeks = function renderWeeks() {
    var _this2 = this;
    var currentMonthView = this.state.selectedMonth;
    var currentSelectedDay = this.state.selectedDay;
    var monthEvents = this.state.selectedMonthEvents;
    var weeks = [];
    var done = false;
    var previousCurrentNextView = currentMonthView.clone().startOf("month").subtract(1, "d").day("Monday");
    var count = 0;
    var monthIndex = previousCurrentNextView.month();
    while (!done) {
      weeks.push(React.createElement(Week, {
        previousCurrentNextView: previousCurrentNextView.clone(),
        currentMonthView: currentMonthView,
        monthEvents: monthEvents,
        selected: currentSelectedDay,
        select: function select(day) {
          return _this2.select(day);
        }
      }));
      previousCurrentNextView.add(1, "w");
      done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
      monthIndex = previousCurrentNextView.month();
    }
    return weeks;
  };
  Calendar.prototype.handleAdd = function handleAdd() {
    var monthEvents = this.state.selectedMonthEvents;
    var currentSelectedDate = this.state.selectedDay;
    var newEvents = [];
    var eventTitle = prompt("Please enter a name for your event: ");
    switch (eventTitle) {
      case "":
        alert("Event name cannot be empty.");
        break;
      case null:
        alert("Changed your mind? You can add one later!");
        break;
      default:
        var newEvent = {
          title: eventTitle,
          date: currentSelectedDate,
          dynamic: true
        };
        newEvents.push(newEvent);
        for (var i = 0; i < newEvents.length; i++) {
          monthEvents.push(newEvents[i]);
        }
        this.setState({
          selectedMonthEvents: monthEvents
        });
        break;
    }
  };
  Calendar.prototype.addEvent = function addEvent() {
    var currentSelectedDate = this.state.selectedDay;
    var isAfterDay = moment().startOf("day").subtract(1, "d");
    if (currentSelectedDate.isAfter(isAfterDay)) {
      this.handleAdd();
    } else {
      if (confirm("Are you sure you want to add an event in the past?")) {
        this.handleAdd();
      } else {} // end confirm past
    } //end is in the past
  };
  Calendar.prototype.removeEvent = function removeEvent(i) {
    var monthEvents = this.state.selectedMonthEvents.slice();
    var currentSelectedDate = this.state.selectedDay;
    if (confirm("Are you sure you want to remove this event?")) {
      var index = i;
      if (index != -1) {
        monthEvents.splice(index, 1);
      } else {
        alert("No events to remove on this day!");
      }
      this.setState({
        selectedMonthEvents: monthEvents
      });
    }
  };
  Calendar.prototype.initialiseEvents = function initialiseEvents() {
    var monthEvents = this.state.selectedMonthEvents;
    var allEvents = [];
    var event1 = {
      title: "Press the Add button and enter a name for your event. P.S you can delete me by pressing me!",
      date: moment(),
      dynamic: false
    };
    
    this.setState({
      selectedMonthEvents: monthEvents
    });
  };
  Calendar.prototype.render = function render() {
    var _this3 = this;
    var currentMonthView = this.state.selectedMonth;
    var currentSelectedDay = this.state.selectedDay;
    var showEvents = this.state.showEvents;
    if (showEvents) {
      return React.createElement("section", {
        className: "main-calendar"
      }, React.createElement("header", {
        className: "calendar-header"
      }, React.createElement("div", {
        className: "row title-header"
      }, this.renderDayLabel()), React.createElement("div", {
        className: "row button-container"
      }, React.createElement("i", {
        className: "box arrow fa fa-angle-left",
        onClick: this.showCalendar
      }), React.createElement("i", {
        className: "box event-button fa fa-plus-square",
        onClick: this.addEvent
      }))), React.createElement(Events, {
        selectedMonth: this.state.selectedMonth,
        selectedDay: this.state.selectedDay,
        selectedMonthEvents: this.state.selectedMonthEvents,
        removeEvent: function removeEvent(i) {
          return _this3.removeEvent(i);
        }
      }));
    } else {
      return React.createElement("section", {
        className: "main-calendar"
      }, React.createElement("header", {
        className: "calendar-header"
      }, React.createElement("div", {
        className: "row title-header"
      }, React.createElement("i", {
        className: "box arrow fa fa-angle-left",
        onClick: this.previous
      }), React.createElement("div", {
        className: "box header-text"
      }, this.renderTodayLabel(), this.renderMonthLabel()), React.createElement("i", {
        className: "box arrow fa fa-angle-right",
        onClick: this.next
      })), React.createElement(DayNames, null)), React.createElement("div", {
        className: "days-container"
      }, this.renderWeeks()));
    }
  };
  return Calendar;
}(React.Component);
var Events = function(_React$Component2) {
  _inherits(Events, _React$Component2);

  function Events() {
    _classCallCheck(this, Events);
    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }
  Events.prototype.render = function render() {
    var currentMonthView = this.props.selectedMonth;
    var currentSelectedDay = this.props.selectedDay;
    var monthEvents = this.props.selectedMonthEvents;
    var removeEvent = this.props.removeEvent;
    var monthEventsRendered = monthEvents.map(function(event, i) {
      return React.createElement("div", {
        key: event.title,
        className: "event-container",
        onClick: function onClick() {
          return removeEvent(i);
        }
      }, React.createElement(ReactCSSTransitionGroup, {
        component: "div",
        className: "animated-time",
        transitionName: "time",
        transitionAppear: true,
        transitionAppearTimeout: 500,
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 500
      }, React.createElement("div", {
        className: "event-time event-attribute"
      }, event.date.format("HH:mm"))), React.createElement(ReactCSSTransitionGroup, {
        component: "div",
        className: "animated-title",
        transitionName: "title",
        transitionAppear: true,
        transitionAppearTimeout: 500,
        transitionEnterTimeout: 500,
        transitionLeaveTimeout: 500
      }, React.createElement("div", {
        className: "event-title event-attribute"
      }, event.title)));
    });
    var dayEventsRendered = [];
    for (var i = 0; i < monthEventsRendered.length; i++) {
      if (monthEvents[i].date.isSame(currentSelectedDay, "day")) {
        dayEventsRendered.push(monthEventsRendered[i]);
      }
    }
    return React.createElement("div", {
      className: "day-events"
    }, dayEventsRendered);
  };
  return Events;
}(React.Component);
var DayNames = function(_React$Component3) {
  _inherits(DayNames, _React$Component3);

  function DayNames() {
    _classCallCheck(this, DayNames);
    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }
  DayNames.prototype.render = function render() {
    return React.createElement("div", {
      className: "row days-header"
    }, React.createElement("span", {
      className: "box day-name"
    }, "Mon"), React.createElement("span", {
      className: "box day-name"
    }, "Tue"), React.createElement("span", {
      className: "box day-name"
    }, "Wed"), React.createElement("span", {
      className: "box day-name"
    }, "Thu"), React.createElement("span", {
      className: "box day-name"
    }, "Fri"), React.createElement("span", {
      className: "box day-name"
    }, "Sat"), React.createElement("span", {
      className: "box day-name"
    }, "Sun"));
  };
  return DayNames;
}(React.Component);
var Week = function(_React$Component4) {
  _inherits(Week, _React$Component4);

  function Week() {
    _classCallCheck(this, Week);
    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }
  Week.prototype.render = function render() {
    var days = [];
    var date = this.props.previousCurrentNextView;
    var currentMonthView = this.props.currentMonthView;
    var selected = this.props.selected;
    var select = this.props.select;
    var monthEvents = this.props.monthEvents;
    for (var i = 0; i < 7; i++) {
      var dayHasEvents = false;
      for (var j = 0; j < monthEvents.length; j++) {
        if (monthEvents[j].date.isSame(date, "day")) {
          dayHasEvents = true;
        }
      }
      var day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === currentMonthView.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        hasEvents: dayHasEvents
      };
      days.push(React.createElement(Day, {
        day: day,
        selected: selected,
        select: select
      }));
      date = date.clone();
      date.add(1, "d");
    }
    return React.createElement("div", {
      className: "row week"
    }, days);
  };
  return Week;
}(React.Component);
var Day = function(_React$Component5) {
  _inherits(Day, _React$Component5);

  function Day() {
    _classCallCheck(this, Day);
    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }
  Day.prototype.render = function render() {
    var day = this.props.day;
    var selected = this.props.selected;
    var select = this.props.select;
    return React.createElement("div", {
      className: "day" + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.date.isSame(selected) ? " selected" : "") + (day.hasEvents ? " has-events" : ""),
      onClick: function onClick() {
        return select(day);
      }
    }, React.createElement("div", {
      className: "day-number"
    }, day.number));
  };
  return Day;
}(React.Component);
ReactDOM.render(React.createElement(Calendar, null), document.getElementById("calendar-content"));