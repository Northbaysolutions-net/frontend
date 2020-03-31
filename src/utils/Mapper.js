import _ from 'lodash';

// Mapper File
/*
In this file, each response of API is mapped according to the naming conventions used at front end to
avoid naming conflicts
*/

export function loginMapper(login_res) {
  let temp = {};
  temp = _.mapKeys(login_res, function(value, key) {
    if (key === 'name') {
      return (key = 'value');
    } else {
      return key;
    }
  });
  return temp;
}

export function chartMapper(value, key) {
  if (key === '_id') {
    return (key = 'id');
  } else if (key === 'patientId') {
    return (key = 'directory_name');
  } else if (key === 'numberOfPages') {
    return (key = 'total_pages');
  } else if (key === 'comment') {
    return (key = 'comments');
  } else if (key === 'state' || key === 'assigned' || key === 'assigned_date') {
    return 'current_assignment';
  } else {
    return key;
  }
}

export function getCharts(charts_res) {
  let temp = {};
  let charts = [];

  charts = charts_res.map(chart => {
    temp = _.mapKeys(chart, chartMapper);

    temp = _.assign(temp, {
      current_assignment: {
        state: chart['state'],
        assigned: chart['assigned'],
        assigned_date: chart['assigned_date']
      }
    });

    if (
      temp['current_assignment']['assigned'] === null ||
      temp['current_assignment']['assigned'] === ''
    ) {
      temp['current_assignment']['assigned'] =
        '5dee2b8046a0a8a0245c376f5dee2b8046a0a8a0245c376f5dee2b8046a0a8a0245c376f';
    }
    if (temp['current_assignment']['assigned_date'] === null) {
      temp['current_assignment']['assigned_date'] = '';
    } else {
    }
    if (temp['state'] === null) {
      temp['state'] = 'null';
    }

    return temp;
  });
  return _.orderBy(charts, ['id'], ['desc']);
}

export function getOCRText(ocr_res) {
  let temp = {};
  temp = _.mapKeys(ocr_res, function(value, key) {
    if (key === 'pageText') {
      return (key = 'value');
    } else {
      return key;
    }
  });
  return temp;
}

export function getLoginConfigurations(configurations) {
  console.log(configurations);
  let temp = {};
  let states = [];
  let states_res = configurations.Stages;
  let count = 1;
  states = states_res.map(state => {
    temp = _.mapKeys(state, function(value, key) {
      if (key === 'label') {
        return (key = 'value');
      } else {
        return key;
      }
    });
    temp['key'] = count;
    count = count + 1;
    return temp;
  });
  configurations.Stages = states;

  temp = {};
  count = 1;
  let all_assignee_res = configurations.Users;
  let users = [];
  users = all_assignee_res.map(user => {
    temp = _.mapKeys(user, function(value, key) {
      if (key === 'name') {
        return (key = 'value');
      } else {
        return key;
      }
    });
    temp['key'] = count;
    count = count + 1;
    return temp;
  });
  users.push({
    id:
      '5dee2b8046a0a8a0245c376f5dee2b8046a0a8a0245c376f5dee2b8046a0a8a0245c376f',
    key: count,
    value: 'Unassigned'
  });
  configurations.Users = users;
  return configurations;
}
