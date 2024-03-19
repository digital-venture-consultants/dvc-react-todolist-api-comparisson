# Projekt - API Technologie Vergleich 
## NodeJs vs Golang

--- 

### NodeJs
Url: https://nodejs.org/en
written in: go
### Golang
Url: https://go.dev/
written in: js/ ts (optional)

---

### Ziel/ Fragestellung
Wie viel Ressourcen verbraucht die jeweilige Technologie und wie sind die Unterschiede in der Performance

---
### Projekt aufbau
Die beiden Technologien sollen eine REST API abbilden mit den einfachsten Funktionen [CRUD](https://datascientest.com/de/crud-definition-funktionsweise)

Im Frontend wird [ReactJs](https://react.dev/) genutzt, um die Funktion zu visualisieren.

Um die Messbarkeit zu normalisieren. Wird Docker verwendet, um die beiden APIs in die gleichen Szenarien zu bringen.

---

### Ergebnis

Offside:
Chrome ist nicht in der Lage enorm viele in wenigen Sekunden zu behandeln.

| info | Vor jedem Test wurden die Container neu gestartet um sicherzustellen, dass jeder Test die gleiche Bedingung hat.  |
|------|:------------------------------------------------------------------------------------------------------------------|

Auswertung von Docker

| Initialer zustand   | NodeJs   | GoLang  |
|---------------------|----------|---------|
| Arbeitsspeicher     | 174.2 MB | 7.54 MB |
| CPU Usage           | 0%       | 0%      |

Auswertung vom [Loadtest Package](https://www.npmjs.com/package/loadtest) ab Max time in seconds

Legende:
- Rps: *Request Per Seconds*
- Concurrent clients: *Concurrent Clients means the number of client hosts which are able to use the Software functionalities at the same time*

| Unter last          | NodeJs   | GoLang   |
|---------------------|----------|----------|
| Arbeitsspeicher     | 366.9 MB | 20.16 MB |
| CPU Usage           | 106.69%  | 28.34%   |
| Max time (s):       | 10       | 10       |
| Target rps:         | 2000     | 2000     |
| Concurrent clients  | 6206     | 646      |
| Running on cores    | 6        | 6        |
| Completed requests  | 4417     | 19619    |
| Total errors        | 0        | 111      |
| Total time          | 10.691 s | 10.011 s |
| Mean latency        | 903.4 ms | 36.5 ms  |
| Effective rps       | 413      | 1960     |

Mögliche Fehlerquellen:

- [Loadtest](https://www.npmjs.com/package/loadtest) ein NPM Package das auf nodeJs aufbaut.
- Nicht optimierter Code

### Testing mit [k6](https://k6.io/docs/)

Legende:
- vus: *virtual users = more is better*

| Test                | NodeJs   | Golang   |
|---------------------|----------|----------|
| Arbeitsspeicher     | 174.2 MB | 38.12 MB |
| CPU Usage           | 132.81%  | 11.26%   |

#### Go API k6 Auswertung

     scenarios: (100.00%) 1 scenario, 500 max VUs, 1m30s max duration (incl. graceful stop):
              * default: Up to 500 looping VUs for 1m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     ✓ status is 200

     checks.........................: 100.00% ✓ 45324      ✗ 0    
     data_received..................: 17 MB   281 kB/s
     data_sent......................: 6.0 MB  98 kB/s
     http_req_blocked...............: avg=16.15µs min=0s    med=3µs    max=1.41ms  p(90)=7µs    p(95)=10µs  
     http_req_connecting............: avg=10.53µs min=0s    med=0s     max=1.26ms  p(90)=0s     p(95)=0s    
     http_req_duration..............: avg=1.86ms  min=177µs med=1.21ms max=21.61ms p(90)=4.15ms p(95)=5.38ms
       { expected_response:true }...: avg=1.86ms  min=177µs med=1.21ms max=21.61ms p(90)=4.15ms p(95)=5.38ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 45324
     http_req_receiving.............: avg=32.35µs min=4µs   med=27µs   max=1.02ms  p(90)=56µs   p(95)=73µs  
     http_req_sending...............: avg=16µs    min=2µs   med=11µs   max=4.7ms   p(90)=31µs   p(95)=44µs  
     http_req_tls_handshaking.......: avg=0s      min=0s    med=0s     max=0s      p(90)=0s     p(95)=0s    
     http_req_waiting...............: avg=1.81ms  min=153µs med=1.15ms max=21.56ms p(90)=4.1ms  p(95)=5.34ms
     http_reqs......................: 45324   742.901938/s
     iteration_duration.............: avg=1s      min=1s    med=1s     max=1.02s   p(90)=1s     p(95)=1s    
     iterations.....................: 22662   371.450969/s
     vus............................: 31      min=17       max=500
     vus_max........................: 500     min=500      max=500


running (1m01.0s), 000/500 VUs, 22662 complete and 0 interrupted iterations
default ✓ 000/500 VUs  1m0s
---
#### NodeJs API Auswertung

     scenarios: (100.00%) 1 scenario, 500 max VUs, 1m30s max duration (incl. graceful stop):
              * default: Up to 500 looping VUs for 1m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     ✓ status is 200

     checks.........................: 100.00% ✓ 40064      ✗ 0    
     data_received..................: 8.9 GB  144 MB/s
     data_sent......................: 5.3 MB  86 kB/s
     http_req_blocked...............: avg=9.33µs   min=0s    med=2µs    max=1.25ms   p(90)=5µs      p(95)=6µs     
     http_req_connecting............: avg=5.59µs   min=0s    med=0s     max=1.1ms    p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=71.76ms  min=201µs med=3.61ms max=633.2ms  p(90)=255.37ms p(95)=378.65ms
       { expected_response:true }...: avg=71.76ms  min=201µs med=3.61ms max=633.2ms  p(90)=255.37ms p(95)=378.65ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 40064
     http_req_receiving.............: avg=139.93µs min=4µs   med=59µs   max=11.3ms   p(90)=343µs    p(95)=426µs   
     http_req_sending...............: avg=13.06µs  min=1µs   med=10µs   max=1.81ms   p(90)=26µs     p(95)=31µs    
     http_req_tls_handshaking.......: avg=0s       min=0s    med=0s     max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=71.61ms  min=178µs med=3.42ms max=632.87ms p(90)=255.34ms p(95)=378.61ms
     http_reqs......................: 40064   649.865972/s
     iteration_duration.............: avg=1.14s    min=1s    med=1s     max=2s       p(90)=1.55s    p(95)=1.58s   
     iterations.....................: 20032   324.932986/s
     vus............................: 202     min=17       max=500
     vus_max........................: 500     min=500      max=500


running (1m01.6s), 000/500 VUs, 20032 complete and 0 interrupted iterations
default ✓ 000/500 VUs  1m0s

---

### Ergebnis

Golang ist im Test NodeJs überlegen. Es ist performanter und ressourcen schonender. 