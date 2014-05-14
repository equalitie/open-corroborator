/*global define*/
// Author: Cormac McGuire
// ### test data for graphDataSpec
// 

define(
  [],
  function() {
  'use strict';

    return {
      inputData: {
        pieBarData: {
          'Child': 3454,
          'Adult': 2000
        },
        trendData: {
          '2013-10-15T15:11:37Z': 3,
          '2013-12-02T11:49:24Z': 3,
          '2013-12-02T11:55:31Z': 4
        }
      },
      expectedOutputData: {
        pieBarData: {
          values: [
            {
              label: 'Child',
              value: 3454
            },
            {
              label: 'Adult',
              value: 3454
            }
          ]
        },
        trendData: {
          values: [
            { 
              values: [
                [ '2013-10-15T15:11:37Z', 3 ],
                [ '2013-12-02T11:49:24Z', 3 ],
                [ '2013-12-02T11:55:31Z', 4 ]
              ]// end inner values
            }
          ]// end outer values
        }// end trend output data
      }
    };
  
  }
);
