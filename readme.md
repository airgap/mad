# Kline By Minute

## HTTP endpoint

Example GET:

```
-> curl http://localhost:8008/ETHUSD/26648642
<- 1598918520000,434.71000000,435.24000000,434.71000000,434.86000000,501.72752000,1598918579999,218241.13816760,271,151.42315000,65864.26898090,0
```

## Fields
Field name | Example Value
---|---
Open time | 1598918520000
Open | 434.71000000
High | 435.24000000
Low | 434.71000000
Close | 434.86000000
Volume | 501.72752000
Close time | 1598918579999
Quote asset volume | 218241.13816760
Number of trades | 271
Taker buy base asset volume | 151.42315000
Taker buy quote asset volume | 65864.26898090
Ignore | 0

## Scripts

### Setup
KBM doesn't need built. Just [install deno](https://deno.land/#installation).

### Start
Cache Kline data and run server

##### Instant
```bash
curl https://cdn.jsdelivr.net/gh/Linky-Studio/kbm/start-remote.sh | sh
```

##### When cloned
```bash
./start.sh
```

### Clean
Removes cached data
```bash
./clean.sh
```