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

#### Docker Settings:
- CPU limit: 1
- Memory limit: 1Gb
- Swap: 0 Bytes
- Virtual Disk limit: 64GB

| info | Vor jedem Test wurden die Container neu gestartet um sicherzustellen, dass jeder Test die gleiche Bedingung hat.  |
|------|:------------------------------------------------------------------------------------------------------------------|

Auswertung von Docker

| Initialer zustand   | NodeJs   | GoLang  | Java          |
|---------------------|----------|---------|---------------|
| Arbeitsspeicher     | 184.3 MB | 7.54 MB | 101.6 Mb      |
| CPU Usage           | 0%       | 0%      | 0.19% ~ 0.27% |

Auswertung vom [Loadtest Package](https://www.npmjs.com/package/loadtest) ab Max time in seconds

- c = max duration
- rps = request per second

#### NodeJs loadtest
```shell
loadtest -c 10 --rps 2000 http://localhost:3000/todo
```

```
Target URL:          http://localhost:3000/todo
Max time (s):        10
Target rps:          2000
Concurrent clients:  12488
Running on cores:    6
Agent:               none

Completed requests:  7506
Total errors:        0
Total time:          10.013 s
Mean latency:        516 ms
Effective rps:       750

Percentage of requests served within a certain time
  50%      503 ms
  90%      545 ms
  95%      568 ms
  99%      618 ms
 100%      631 ms (longest request)
```
#### golang loadtest

```shell
loadtest -c 10 --rps 2000 http://localhost:1337/todo
```
```
Target URL:          http://localhost:1337/todo
Max time (s):        10
Target rps:          2000
Concurrent clients:  12116
Running on cores:    6
Agent:               none

Completed requests:  7558
Total errors:        0
Total time:          10.048 s
Mean latency:        504 ms
Effective rps:       752

Percentage of requests served within a certain time
  50%      501 ms
  90%      506 ms
  95%      523 ms
  99%      561 ms
 100%      604 ms (longest request)
```
#### Java Springboot API
```
Target URL:          http://localhost:8080/todo
Max time (s):        10
Target rps:          2000
Concurrent clients:  16233
Running on cores:    6
Agent:               none

Completed requests:  3769
Total errors:        369
Total time:          10.01 s
Mean latency:        3894.4 ms
Effective rps:       377

Percentage of requests served within a certain time
50%      3814 ms
90%      7009 ms
95%      7654 ms
99%      7755 ms
100%      7760 ms (longest request)

-1:   369 errors
```
Legende:
- Concurrent clients: *Concurrent Clients means the number of client hosts which are able to use the Software functionalities at the same time*

#### Docker stats

| Unter last (peak) | NodeJs   | GoLang   | Java   |
|-------------------|----------|----------|--------|
| Arbeitsspeicher   | 239.9 MB | 48.21 MB | 355 MB |
| CPU Usage         | 83.41%   | 33.11%   | 48.1%  |

Mögliche Fehlerquellen:

- [Loadtest](https://www.npmjs.com/package/loadtest) ein NPM Package das auf nodeJs aufbaut.
- Nicht optimierter Code

### Testing mit [k6](https://k6.io/docs/)

```shell
k6 run ./test-go.js
k6 run ./test-nodeJs.js
```

Legende:
- vus: *virtual users = more is better*

| Test                | NodeJs   | Golang   | Java   |
|---------------------|----------|----------|--------|
| Arbeitsspeicher     | 425.2 MB | 38.12 MB | 212 MB |
| CPU Usage           | 77.91%   | 11.26%   | 66.08% |

#### NodeJs API k6 Auswertung

     scenarios: (100.00%) 1 scenario, 500 max VUs, 1m30s max duration (incl. graceful stop):
              * default: Up to 500 looping VUs for 1m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     ✓ status is 200

     checks.........................: 100.00% ✓ 20540      ✗ 0    
     data_received..................: 2.4 GB  27 MB/s
     data_sent......................: 2.7 MB  31 kB/s
     http_req_blocked...............: avg=20.87µs  min=0s    med=3µs      max=4.72ms  p(90)=6µs      p(95)=8µs     
     http_req_connecting............: avg=14.8µs   min=0s    med=0s       max=4.65ms  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=771.47ms min=212µs med=502.54ms max=31.12s  p(90)=846.76ms p(95)=996.47ms
       { expected_response:true }...: avg=771.47ms min=212µs med=502.54ms max=31.12s  p(90)=846.76ms p(95)=996.47ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 20540
     http_req_receiving.............: avg=122.26µs min=4µs   med=73µs     max=10.68ms p(90)=287µs    p(95)=341µs   
     http_req_sending...............: avg=17.09µs  min=1µs   med=13µs     max=524µs   p(90)=31µs     p(95)=41µs    
     http_req_tls_handshaking.......: avg=0s       min=0s    med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=771.33ms min=192µs med=502.38ms max=31.12s  p(90)=846.58ms p(95)=996.23ms
     http_reqs......................: 20540   231.887938/s
     iteration_duration.............: avg=2.54s    min=1.5s  med=1.59s    max=32.65s  p(90)=2.35s    p(95)=4.5s    
     iterations.....................: 10270   115.943969/s
     vus............................: 5       min=5        max=500
     vus_max........................: 500     min=500      max=500

    running (1m28.6s), 000/500 VUs, 10270 complete and 0 interrupted iterations
    default ✓ [======================================] 000/500 VUs  1m0s
---
#### Go API Auswertung

     scenarios: (100.00%) 1 scenario, 500 max VUs, 1m30s max duration (incl. graceful stop):
              * default: Up to 500 looping VUs for 1m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     ✓ status is 200

     checks.........................: 100.00% ✓ 43760      ✗ 0    
     data_received..................: 17 GB   283 MB/s
     data_sent......................: 5.8 MB  94 kB/s
     http_req_blocked...............: avg=9.32µs   min=0s    med=2µs    max=1.67ms   p(90)=5µs     p(95)=6µs     
     http_req_connecting............: avg=5.64µs   min=0s    med=0s     max=1.59ms   p(90)=0s      p(95)=0s      
     http_req_duration..............: avg=21.34ms  min=136µs med=1.7ms  max=268.89ms p(90)=81.14ms p(95)=134.69ms
       { expected_response:true }...: avg=21.34ms  min=136µs med=1.7ms  max=268.89ms p(90)=81.14ms p(95)=134.69ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 43760
     http_req_receiving.............: avg=236.26µs min=4µs   med=111µs  max=62.94ms  p(90)=555µs   p(95)=647µs   
     http_req_sending...............: avg=13.37µs  min=1µs   med=9µs    max=1.02ms   p(90)=29µs    p(95)=35µs    
     http_req_tls_handshaking.......: avg=0s       min=0s    med=0s     max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=21.09ms  min=112µs med=1.39ms max=268.84ms p(90)=80.8ms  p(95)=134.31ms
     http_reqs......................: 43760   714.018703/s
     iteration_duration.............: avg=1.04s    min=1s    med=1s     max=1.49s    p(90)=1.16s   p(95)=1.25s   
     iterations.....................: 21880   357.009352/s
     vus............................: 120     min=17       max=500
     vus_max........................: 500     min=500      max=500

    running (1m01.3s), 000/500 VUs, 21880 complete and 0 interrupted iterations
    default ✓ [======================================] 000/500 VUs  1m0s


---
#### Java API Auswertung
     scenarios: (100.00%) 1 scenario, 500 max VUs, 1m30s max duration (incl. graceful stop):
              * default: Up to 500 looping VUs for 1m0s over 2 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     ✗ status is 200
      ↳  99% — ✓ 27001 / ✗ 1

     checks.........................: 99.99% ✓ 27001      ✗ 1    
     data_received..................: 4.3 GB 69 MB/s
     data_sent......................: 3.6 MB 58 kB/s
     http_req_blocked...............: avg=12.2µs   min=0s    med=1µs      max=5.02ms   p(90)=5µs      p(95)=7µs     
     http_req_connecting............: avg=8.7µs    min=0s    med=0s       max=4.76ms   p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=348.62ms min=129µs med=501.55ms max=2.01s    p(90)=738.72ms p(95)=833.45ms
       { expected_response:true }...: avg=348.61ms min=129µs med=501.55ms max=2.01s    p(90)=738.73ms p(95)=833.46ms
     http_req_failed................: 0.00%  ✓ 1          ✗ 27001
     http_req_receiving.............: avg=40.46ms  min=4µs   med=246µs    max=581.72ms p(90)=145.56ms p(95)=215.78ms
     http_req_sending...............: avg=9.35µs   min=1µs   med=4µs      max=1.03ms   p(90)=23µs     p(95)=35µs    
     http_req_tls_handshaking.......: avg=0s       min=0s    med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=308.15ms min=119µs med=500.62ms max=1.55s    p(90)=585.66ms p(95)=668.08ms
     http_reqs......................: 27002  436.863564/s
     iteration_duration.............: avg=1.69s    min=1.5s  med=1.61s    max=3.07s    p(90)=2s       p(95)=2.21s   
     iterations.....................: 13501  218.431782/s
     vus............................: 153    min=17       max=500
     vus_max........................: 500    min=500      max=500

    running (1m01.8s), 000/500 VUs, 13501 complete and 0 interrupted iterations
    default ✓ [======================================] 000/500 VUs  1m0s
### Ergebnis

Golang ist im Test NodeJs überlegen. Es ist performanter und ressourcen schonender. 