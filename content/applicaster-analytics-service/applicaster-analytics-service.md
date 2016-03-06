# Applicaster Analytics Service

1. [About](#about)
2. [Terminology](#terminology)
3. [Architecture](#architecture)


## About
#### Why?
Enhance applicaster's products with analytics, to provide transperancy for
customers and ease the proccess of data driven decisions.
#### What?
The service exposes an API that all of applicaster's products can consume in
order to make use of analyzed data for visualizations or integrate the
data as part of other products.
#### How?
Events from applications will eventually be piped into a data warehouse where they are stored
as raw data. The raw data will be analyzed by periodic processes and
ad-hoc queries. The API will serve the analyzed data. 

At this stage, AAS (Applicaster Analytics Service) uses Google Analytics as the
data source. Because of Google's API's rules and regulations, AAS must
orchestrate the fetching of the raw data to S3 so that it can be made available
for analysis. See the [architecture](#architecture) and [docs][docs] for further 
technical implementation details.

#### Status

Authentication Component completed with Google Analytics. Fetcher Component in Development.

## Terminology
The project uses some terms for abbreviation. The terms are also used in the
naming of variables. 
* **Account** - Applicaster Account
* **AAS** - Applicaster Analytics Service
* **GUA** - Google User Account
* **GAA** - Google Analytics Account
* **GAT** - Google Analytics Tracking ID
* **configuredGAT** - **GAT** that is configured in Zapp for **Account** When 'Display in CMS Dashboard' is checked
* **permittedGAT** - **GAT** that a **GUA** has access to in his or her **GAA**
* **client** - User of **AAS** API 
* **userAdmin** - User of **client** who has the role of 'analytics-admin'
* **userViewer** - User of **client** who has the role of 'analytics-viewer'
* **Authorize** - **userAdmin** clicks on **authUrl**. This attempts to authorize access for **AAS** to a **GUA** if the **configuredGAT** matches to a **GAT** of the **GAA** for that **GUA**.
* **authURL** - the URL to trigger **Authorize**
* **certifiedGAT** - **configuredGAT** that is a **permittedGAT** when  **Authorize**
* **authorizedGAT** -  **configuredGAT** after  **Authorize** successfully
* **unauthorizedGAT** - **configuredGAT** but still not **Authorize** successfully
* **selectDefaultGAT** - **endUser** selects the default **GAT** to populate the a **client** with.
## Architecture
The building blocks of `AAS` are `components` and `services`. The components
are a set of functionalities which perform different operations. The components
which have functionalities that are exposed as an API endpoint are nested under
the same name.
#### components:
1. [Authentication][authentication docs]
  * API endpoint: `/authentication/...`
2. [Fetcher](#architecture)
  * API endpoint: `/fetcher/...`
3. [Analyzer](#architecture)
  * API endpoint: `/analyzer/...`
![architecture][architecture sketch]

[docs]: https://github.com/applicaster/applicaster-analytics-service/tree/master/docs
[authentication docs]: https://github.com/applicaster/applicaster-analytics-service/blob/master/docs/components/authentication.md
[architecture sketch]: https://github.com/applicaster/applicaster-analytics-service/blob/master/docs/assets/architecture.png?raw=true
[.env]: https://docs.google.com/document/d/11hfpkS12j3F-LmfmiCpP7T8ehcYbirNEY2zgGLNO_iE
[google developers console project]: https://developers.google.com/identity/sign-in/web/devconsole-project
[nodejs and npm]: https://docs.npmjs.com/getting-started/installing-node
[mongoDB]: https://docs.mongodb.org/manual/installation/