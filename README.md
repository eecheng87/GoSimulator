# GoSimulator

## How to build

change directory:
```
> cd GoSimulator
```

install dependencies:
```
> npm install
```

run the app:
```
> SET DEBUG=gosimulator:* & npm start
```

open web through url: [http://localhost:3000/](http://localhost:3000/)

## Develop mode
open server through `nodemon`, it will re-run when file was changed
```
> nodemon ./bin/www
```

## About Smart Game Format

### Visualize format

```text
aa ba ca da ea fa ga ha ia ja ka la ma na oa pa qa ra sa
ab bb cb db eb fb gb hb ib jb kb lb mb nb ob pb qb rb sb
ac bc cc dc ec fc gc hc ic jc kc lc mc nc oc pc qc rc sc
ad bd cd dd ed fd gd hd id jd kd ld md nd od pd qd rd sd
ae be ce de ee fe ge he ie je ke le me ne oe pe qe re se
af bf cf df ef ff gf hf if jf kf lf mf nf of pf qf rf sf
ag bg cg dg eg fg gg hg ig jg kg lg mg ng og pg qg rg sg
ah bh ch dh eh fh gh hh ih jh kh lh mh nh oh ph qh rh sh
ai bi ci di ei fi gi hi ii ji ki li mi ni oi pi qi ri si
aj bj cj dj ej fj gj hj ij jj kj lj mj nj oj pj qj rj sj
ak bk ck dk ek fk gk hk ik jk kk lk mk nk ok pk qk rk sk
al bl cl dl el fl gl hl il jl kl ll ml nl ol pl ql rl sl
am bm cm dm em fm gm hm im jm km lm mm nm om pm qm rm sm
an bn cn dn en fn gn hn in jn kn ln mn nn on pn qn rn sn
ao bo co do eo fo go ho io jo ko lo mo no oo po qo ro so
ap bp cp dp ep fp gp hp ip jp kp lp mp np op pp qp rp sp
aq bq cq dq eq fq gq hq iq jq kq lq mq nq oq pq qq rq sq
ar br cr dr er fr gr hr ir jr kr lr mr nr or pr qr rr sr
as bs cs ds es fs gs hs is js ks ls ms ns os ps qs rs ss
```
