(this.webpackJsonp = this.webpackJsonp || []).push([
  [0],
  {
    166: function (e, t, n) {
      "use strict";
      var r = n(1),
        a = n.n(r),
        o = n(46),
        c = n(38),
        i = n(116),
        u = n(80),
        s = n.n(u),
        l = n(96),
        f = {
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
          10: 10,
          jack: 10,
          queen: 10,
          king: 10,
          ace: 11,
        },
        d = ["diamonds", "hearts", "spades", "clubs"],
        m = function () {
          return Object.keys(f)
            .map(function (e) {
              return d.map(function (t) {
                return { suit: t, rank: e };
              });
            })
            .flat();
        },
        p = function (e) {
          return e > 21;
        },
        g = function (e, t, n) {
          return p(e) || (!n && !p(t) && e <= 21 && t <= 21 && e < t);
        },
        v = function (e, t, n) {
          return (
            !p(e) &&
            "player" !== n &&
            (p(t) || (!n && e <= 21 && t <= 21 && e > t))
          );
        },
        b = function (e) {
          for (var t = 0; t < e.length; t++) {
            var n = Math.floor(Math.random() * (t + 1)),
              r = e[t];
            (e[t] = e[n]), (e[n] = r);
          }
          return e;
        },
        h = function (e) {
          if (0 === e.length) return 0;
          for (
            var t = 0,
              n = e.reduce(function (e, n) {
                return "ace" === n.rank && t++, e + f[n.rank];
              }, 0);
            n > 21 && t > 0;

          )
            (n -= 10), t--;
          return n;
        },
        E = function (e) {
          e.deck = b(m());
        },
        x = function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
          return {
            bet: e,
            chips: 100,
            deck: b(m()),
            dealer: { cards: [], score: 0 },
            isBetting: !0,
            isNewGame: !0,
            player: { cards: [], score: 0 },
            turn: "player",
          };
        },
        y = x(),
        k = Object(l.b)({
          name: "gameControls",
          initialState: y,
          reducers: {
            hit: function (e, t) {
              var n = e.deck.shift();
              e[t.payload].cards.push(n),
                (e[t.payload].score = h(e[t.payload].cards));
            },
            initNewRound: function (e) {
              v(e.player.score, e.dealer.score, e.turn)
                ? (e.chips += e.bet)
                : (e.chips -= e.bet),
                (e.isBetting = !0),
                (e.bet = 0);
            },
            resetDeck: function (e) {
              E(e);
            },
            resetGame: function () {
              return x();
            },
            setTurn: function (e, t) {
              e.turn = t.payload;
            },
            stand: function (e) {
              e.turn = "dealer";
            },
            startNewRound: function (e, t) {
              var n = t.payload;
              function r() {
                return e.deck.shift();
              }
              E(e),
                (e.isBetting = !1),
                e.isNewGame && (e.isNewGame = !1),
                (e.bet = n),
                (e.turn = "player"),
                (e.dealer = { cards: [], score: 0 }),
                (e.player = { cards: [], score: 0 });
              for (var a = 0; a < 4; a++)
                if ((a + 1) % 2 === 0) {
                  var o = r();
                  e.dealer.cards.push(o), (e.dealer.score += h([o]));
                } else {
                  var c = r();
                  e.player.cards.push(c), (e.player.score += h([c]));
                }
            },
            toggleBetting: function (e) {
              e.isBetting = !e.isBetting;
            },
          },
        }),
        B = k.actions,
        I = B.hit,
        w = B.initNewRound,
        D = (B.resetDeck, B.resetGame),
        S = B.setTurn,
        O = (B.stand, B.startNewRound),
        j = (B.toggleBetting, k.name, k.reducer),
        T = n(25),
        C = n.n(T),
        P = n(31),
        N = n(89),
        G = n(54),
        z = n(26);
      function H() {
        var e = C()(["\n  font-size: 22px;\n  font-weight: bold;\n"]);
        return (
          (H = function () {
            return e;
          }),
          e
        );
      }
      function A() {
        var e = C()([
          "\n  padding: 20px;\n  background-color: ",
          ";\n  align-items: center;\n  justify-content: flex-start;\n  margin-bottom: 20px;\n  border-radius: 4px;\n",
        ]);
        return (
          (A = function () {
            return e;
          }),
          e
        );
      }
      var F = "android" === P.a.OS ? G.a : N.a,
        R = Object(z.a)(F)(A(), function (e) {
          return e.disabled ? "#ddd" : "#e89";
        }),
        M = z.a.Text(H());
      function V() {
        var e = C()(["\n  margin-bottom: 10px;\n"]);
        return (
          (V = function () {
            return e;
          }),
          e
        );
      }
      function W() {
        var e = C()(["\n  margin-bottom: 10px;\n  text-align: center;\n"]);
        return (
          (W = function () {
            return e;
          }),
          e
        );
      }
      function q() {
        var e = C()(["\n  padding: 40px 0;\n"]);
        return (
          (q = function () {
            return e;
          }),
          e
        );
      }
      var J = Object(z.a)(c.Layout)(q()),
        L = Object(z.a)(c.Text)(W()),
        U = Object(z.a)(c.Input)(V()),
        Y = o.c,
        K = function (e) {
          var t = e.onSubmit,
            n = a.a.useState(),
            r = s()(n, 2),
            o = r[0],
            i = r[1],
            u = a.a.useState(null),
            l = s()(u, 2),
            f = l[0],
            d = l[1],
            m = Y(function (e) {
              return e.game;
            }).chips;
          return a.a.createElement(
            J,
            { testID: "BetForm" },
            a.a.createElement(L, { category: "h3" }, "Place your bet"),
            a.a.createElement(U, {
              value: o || 0 === o ? o.toString() : "",
              onChangeText: function (e) {
                var t = parseInt(e);
                t || 0 === t
                  ? (i(t),
                    d(
                      t <= 0
                        ? "Bet must be more than 0."
                        : t > m
                        ? "Bet must be less than or equal to your total chips."
                        : null
                    ))
                  : (d("Must be a valid number."), i(e));
              },
              status: f ? "danger" : "primary",
              caption: f || "",
              testID: "BetFormInput",
            }),
            a.a.createElement(
              c.Button,
              {
                disabled: !o || !!f,
                size: "large",
                onPress: function () {
                  "number" === typeof o && t(o);
                },
                testID: "BetFormButton",
              },
              "Bet"
            )
          );
        },
        Q = n(3),
        X = function (e) {
          var t = e.gameOver,
            n = Y(function (e) {
              return e.game;
            }).isBetting,
            r = Object(o.b)();
          return n
            ? a.a.createElement(
                Q.a,
                { testID: "GameControls" },
                a.a.createElement(K, {
                  onSubmit: function (e) {
                    r(O(e));
                  },
                })
              )
            : t
            ? a.a.createElement(
                Q.a,
                { testID: "GameControls" },
                a.a.createElement(
                  R,
                  {
                    testID: "PlayAgainButton",
                    onPress: function () {
                      r(w());
                    },
                  },
                  a.a.createElement(M, null, "Play Again")
                )
              )
            : a.a.createElement(
                Q.a,
                { testID: "GameControls" },
                a.a.createElement(
                  R,
                  {
                    testID: "HitButton",
                    onPress: function () {
                      r(I("player"));
                    },
                  },
                  a.a.createElement(M, null, "Hit")
                ),
                a.a.createElement(
                  R,
                  {
                    testID: "StandButton",
                    onPress: function () {
                      r(S("dealer"));
                    },
                  },
                  a.a.createElement(M, null, "Stand")
                )
              );
        },
        Z = n(33),
        $ = n.n(Z);
      function _() {
        var e = C()(["\n  font-size: 18px;\n"]);
        return (
          (_ = function () {
            return e;
          }),
          e
        );
      }
      var ee = z.a.Text(_()),
        te = function (e) {
          var t = e.suit,
            n = e.rank;
          return a.a.createElement(ee, null, n, " of ", t);
        };
      function ne() {
        var e = C()([
          "\n  font-size: 24px;\n  font-weight: bold;\n  margin-bottom: 8px;\n",
        ]);
        return (
          (ne = function () {
            return e;
          }),
          e
        );
      }
      function re() {
        var e = C()(["\n  margin-bottom: 30px;\n"]);
        return (
          (re = function () {
            return e;
          }),
          e
        );
      }
      var ae = z.a.View(re()),
        oe = z.a.Text(ne()),
        ce = function (e) {
          var t = e.hideCard,
            n = e.person,
            r = e.personState,
            o = e.testID,
            c = void 0 === o ? "Hand" : o;
          return a.a.createElement(
            ae,
            { testID: c },
            a.a.createElement(
              oe,
              { testID: "HandName" },
              n[0].toUpperCase() + n.slice(1),
              " -",
              " ",
              r.cards.length &&
                ("dealer" == n && t
                  ? (function (e) {
                      var t = e.score,
                        n = e.cards,
                        r = t;
                      return (
                        n.slice(1).map(function (e) {
                          r -= f[e.rank];
                        }),
                        r
                      );
                    })(r)
                  : r.score)
            ),
            a.a.createElement(
              Q.a,
              null,
              "dealer" == n && t
                ? a.a.createElement(te, r.cards[0])
                : r.cards.map(function (e, t) {
                    return a.a.createElement(te, $()({ key: t }, e));
                  })
            )
          );
        };
      function ie() {
        var e = C()(["\n  margin: 20px 0;\n"]);
        return (
          (ie = function () {
            return e;
          }),
          e
        );
      }
      function ue() {
        var e = C()([
          "\n  font-size: 40px;\n  text-align: center;\n  font-weight: bold;\n  margin-bottom: 20px;\n",
        ]);
        return (
          (ue = function () {
            return e;
          }),
          e
        );
      }
      function se() {
        var e = C()([
          "\n  font-size: 28px;\n  text-align: center;\n  margin-bottom: 30px;\n  font-weight: 300;\n  letter-spacing: 1px;\n",
        ]);
        return (
          (se = function () {
            return e;
          }),
          e
        );
      }
      function le() {
        var e = C()(["\n  ", ";\n  ", "\n"]);
        return (
          (le = function () {
            return e;
          }),
          e
        );
      }
      var fe = P.a.OS,
        de = z.a.SafeAreaView(
          le(),
          "ios" === fe ? "margin: 0 20px;" : "padding: 0 4%;",
          "android" === fe ? "margin-top: 40px;" : "margin-top: 10px;"
        ),
        me = z.a.Text(se()),
        pe = z.a.Text(ue()),
        ge = z.a.View(ie());
      function ve() {
        var e = a.a.useState(!1),
          t = s()(e, 2),
          n = t[0],
          r = t[1],
          i = Object(o.b)(),
          u = Y(function (e) {
            return e.game;
          }),
          l = u.player,
          f = u.dealer,
          d = u.turn,
          m = u.bet,
          p = u.chips,
          b = u.isBetting;
        return (
          a.a.useEffect(
            function () {
              !(function (e, t, n) {
                return !n || g(e, t, n) || v(e, t, n);
              })(l.score, f.score, d) || n
                ? d && n && r(!1)
                : r(!0);
            },
            [l, f, d]
          ),
          a.a.useEffect(
            function () {
              "dealer" === d &&
                (f.score < 17
                  ? setTimeout(function () {
                      return i(I("dealer"));
                    }, 1e3)
                  : (i(S(null)), r(!0)));
            },
            [f, d]
          ),
          a.a.useEffect(
            function () {
              p || i(D());
            },
            [p]
          ),
          a.a.createElement(
            de,
            null,
            a.a.createElement(pe, null, "Blackjack"),
            n
              ? a.a.createElement(
                  me,
                  { testID: "Status" },
                  (function (e, t, n) {
                    return v(e, t, n)
                      ? "YOU WIN!!"
                      : g(e, t, n)
                      ? "You lost..."
                      : "Pushed";
                  })(l.score, f.score, d)
                )
              : null,
            !b &&
              a.a.createElement(
                c.Text,
                { testID: "CurrentBet", category: "h4" },
                "Current bet: ",
                m.toString()
              ),
            a.a.createElement(
              c.Text,
              { category: "h5" },
              "Total chips: ",
              p.toString()
            ),
            !b &&
              a.a.createElement(
                ge,
                { testID: "Cards" },
                a.a.createElement(ce, {
                  hideCard: "player" === d,
                  person: "dealer",
                  personState: f,
                  testID: "DealerHand",
                }),
                a.a.createElement(ce, {
                  person: "player",
                  personState: l,
                  testID: "PlayerHand",
                })
              ),
            a.a.createElement(X, { gameOver: n })
          )
        );
      }
      var be = n(37),
        he = Object(be.c)({ game: j }),
        Ee = Object(l.a)({ reducer: he });
      function xe() {
        return a.a.createElement(
          c.ApplicationProvider,
          { mapping: i.mapping, theme: i.light },
          a.a.createElement(o.a, { store: Ee }, a.a.createElement(ve, null))
        );
      }
      n.d(t, "a", function () {
        return xe;
      });
    },
    167: function (e, t, n) {
      n(168), (e.exports = n(287));
    },
    168: function (e, t) {
      "serviceWorker" in navigator &&
        window.addEventListener("load", function () {
          navigator.serviceWorker
            .register("/expo-service-worker.js", { scope: "/" })
            .then(function (e) {})
            .catch(function (e) {
              console.info("Failed to register service-worker", e);
            });
        });
    },
  },
  [[167, 1, 2]],
]);
//# sourceMappingURL=app.c250fccd.chunk.js.map
