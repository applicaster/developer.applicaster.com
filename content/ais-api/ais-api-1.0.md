 ### UsageReport API Endpoint

#### Description 

An API that enables external systems to pull Active Users and New Users by Account and by Day or Month. This can be done for each product: App (referred to as "global"), Feed, and Crossmates.

The key "global" in the API refers to app-level users.

#### path : 
##### ` GET /backend/usage_report `
 
  #### Required params
   `access_token` - required

   ` date ` - require Date from the format `%Y-%m-%d`, unless return 422 error

  `bucket_ids` - list of bucket ids, return 422 error if one or more ids are not valid.

##### url example: 
` /backend/usage_reports.json?access_token=valid-access-token&bucket_ids[]=bucket-id-1&bucket_ids[]=bucket-id-1&date=2015-1-1`

##### response example:

``` 
[
  {
    "global": {
      "monthly": [
        {
          "year": 2014,
          "month": 9,
          "day": 30,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2014,
          "month": 10,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2014,
          "month": 11,
          "day": 30,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2014,
          "month": 12,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 1,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 2,
          "day": 28,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 3,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 4,
          "day": 30,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 5,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 6,
          "day": 30,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 7,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "_id": {
            "$oid": "55cb3454ed8d004c7c465e6c"
          },
          "account_id": "08dc9876d286458a9e5a1c2ac7622d49aaf14322",
          "bucket_id": {
            "$oid": "55cb345474616ca721000003"
          },
          "created_at": null,
          "day": null,
          "month": 8,
          "new_users_count": 2,
          "new_users_count_by_app_version": {
            "55cb345474616ca721000004": {
              "1-0": 1,
              "unknown": 1
            }
          },
          "new_users_count_by_apps": {
            "55cb345474616ca721000004": 2
          },
          "resolution": "month",
          "type": "global",
          "unique_users_count": 2,
          "unique_users_count_by_app_version": {
            "55cb345474616ca721000004": {
              "1-0": 1,
              "unknown": 1
            }
          },
          "unique_users_count_by_apps": {
            "55cb345474616ca721000004": 2
          },
          "year": 2015
        }
      ],
      "daily": [
        {
          "_id": {
            "$oid": "55cb3454ed8d004c7c465e6d"
          },
          "account_id": "08dc9876d286458a9e5a1c2ac7622d49aaf14322",
          "bucket_id": {
            "$oid": "55cb345474616ca721000003"
          },
          "created_at": null,
          "day": 12,
          "month": 8,
          "new_users_count": 1,
          "new_users_count_by_app_version": {
            "55cb345474616ca721000004": {
              "1-0": 1
            }
          },
          "new_users_count_by_apps": {
            "55cb345474616ca721000004": 1
          },
          "resolution": "day",
          "type": "global",
          "unique_users_count": 1,
          "unique_users_count_by_app_version": {
            "55cb345474616ca721000004": {
              "1-0": 1
            }
          },
          "unique_users_count_by_apps": {
            "55cb345474616ca721000004": 1
          },
          "year": 2015
        },
        {
          "_id": {
            "$oid": "55ce0a2fed8d004c7c465e76"
          },
          "account_id": "08dc9876d286458a9e5a1c2ac7622d49aaf14322",
          "bucket_id": {
            "$oid": "55cb345474616ca721000003"
          },
          "created_at": null,
          "day": 14,
          "month": 8,
          "new_users_count": 1,
          "new_users_count_by_app_version": {
            "55cb345474616ca721000004": {
              "unknown": 1
            }
          },
          "new_users_count_by_apps": {
            "55cb345474616ca721000004": 1
          },
          "resolution": "day",
          "type": "global",
          "unique_users_count": 1,
          "unique_users_count_by_app_version": {
            "55cb345474616ca721000004": {
              "unknown": 1
            }
          },
          "unique_users_count_by_apps": {
            "55cb345474616ca721000004": 1
          },
          "year": 2015
        }
      ]
    },
    "crossmates": {
      "monthly": [
        {
          "year": 2014,
          "month": 9,
          "day": 30,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2014,
          "month": 10,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2014,
          "month": 11,
          "day": 30,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2014,
          "month": 12,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 1,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 2,
          "day": 28,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 3,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 4,
          "day": 30,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 5,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 6,
          "day": 30,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 7,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "_id": {
            "$oid": "55ce08b7ed8d004c7c465e72"
          },
          "account_id": "08dc9876d286458a9e5a1c2ac7622d49aaf14322",
          "bucket_id": {
            "$oid": "55cb345474616ca721000003"
          },
          "created_at": null,
          "day": null,
          "month": 8,
          "new_users_count": null,
          "new_users_count_by_app_version": null,
          "new_users_count_by_apps": null,
          "resolution": "month",
          "type": "crossmates",
          "unique_users_count": 2,
          "unique_users_count_by_app_version": null,
          "unique_users_count_by_apps": null,
          "year": 2015
        }
      ],
      "daily": [
        {
          "_id": {
            "$oid": "55ce08b7ed8d004c7c465e73"
          },
          "account_id": "08dc9876d286458a9e5a1c2ac7622d49aaf14322",
          "bucket_id": {
            "$oid": "55cb345474616ca721000003"
          },
          "created_at": null,
          "day": 14,
          "month": 8,
          "new_users_count": null,
          "new_users_count_by_app_version": null,
          "new_users_count_by_apps": null,
          "resolution": "day",
          "type": "crossmates",
          "unique_users_count": 2,
          "unique_users_count_by_app_version": null,
          "unique_users_count_by_apps": null,
          "year": 2015
        }
      ]
    },
    "feed": {
      "monthly": [
        {
          "year": 2014,
          "month": 9,
          "day": 30,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2014,
          "month": 10,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2014,
          "month": 11,
          "day": 30,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2014,
          "month": 12,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 1,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 2,
          "day": 28,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 3,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 4,
          "day": 30,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 5,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 6,
          "day": 30,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "year": 2015,
          "month": 7,
          "day": 31,
          "new_users_count": null,
          "unique_users_count": null
        },
        {
          "_id": {
            "$oid": "55ce091ced8d004c7c465e74"
          },
          "account_id": "08dc9876d286458a9e5a1c2ac7622d49aaf14322",
          "bucket_id": {
            "$oid": "55cb345474616ca721000003"
          },
          "created_at": null,
          "day": null,
          "month": 8,
          "new_users_count": null,
          "new_users_count_by_app_version": null,
          "new_users_count_by_apps": null,
          "resolution": "month",
          "type": "feed",
          "unique_users_count": 2,
          "unique_users_count_by_app_version": null,
          "unique_users_count_by_apps": null,
          "year": 2015
        }
      ],
      "daily": [
        {
          "_id": {
            "$oid": "55ce091ced8d004c7c465e75"
          },
          "account_id": "08dc9876d286458a9e5a1c2ac7622d49aaf14322",
          "bucket_id": {
            "$oid": "55cb345474616ca721000003"
          },
          "created_at": null,
          "day": 14,
          "month": 8,
          "new_users_count": null,
          "new_users_count_by_app_version": null,
          "new_users_count_by_apps": null,
          "resolution": "day",
          "type": "feed",
          "unique_users_count": 2,
          "unique_users_count_by_app_version": null,
          "unique_users_count_by_apps": null,
          "year": 2015
        }
      ]
    }
  }
]
```


