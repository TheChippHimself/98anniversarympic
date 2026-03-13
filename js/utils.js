// ═══════════════════════════════════════════════════════
//  IEMELIF Songbook — Shared Utilities
//  Exported from Admin Panel: 3/13/2026, 9:03:17 PM
// ═══════════════════════════════════════════════════════

// ── Chord Transposition Engine ───────────────────────
const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const NOTE_ALT = {'Db':'C#','Eb':'D#','Fb':'E','Gb':'F#','Ab':'G#','Bb':'A#','Cb':'B'};

function noteToIndex(note) {
  const normalized = NOTE_ALT[note] || note;
  return NOTES.indexOf(normalized);
}

function transposeNote(note, semitones) {
  const idx = noteToIndex(note);
  if (idx === -1) return note;
  const newIdx = ((idx + semitones) % 12 + 12) % 12;
  return NOTES[newIdx];
}

function transposeChord(chord, semitones) {
  if (!chord || semitones === 0) return chord;
  return chord.replace(/[A-G][#b]?/g, (match) => transposeNote(match, semitones));
}

function transposeLine(line, semitones) {
  if (!line || semitones === 0) return line;
  return line.replace(/\b[A-G][#b]?(?:maj|min|m|sus|dim|aug|add|dom|M)?[0-9]?(?:\/[A-G][#b]?)?\b/g,
    (chord) => transposeChord(chord, semitones));
}

// ── Song Data Storage ─────────────────────────────────
const STORAGE_KEY = 'iemelif_songbook_v1';

function loadSongs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDefaultSongs();
  } catch(e) {
    return getDefaultSongs();
  }
}

function saveSongs(songs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
}

// ── DEFAULT SONGS (baked in from last export) ─────────
function getDefaultSongs() {
  return [
  {
    "id": 1,
    "title": "Kay Ligaya Kung Akoy Naglilingkod",
    "author": "BDACKLEY",
    "tempo": "♩ = 115",
    "timeSignature": "4/4",
    "verses": [
      {
        "type": "Verse 1",
        "lines": [
          {
            "chord": "                G                                                               G",
            "lyric": "Kay Ligaya kung ako'y Naglilingkod"
          },
          {
            "chord": "                C                        D         G",
            "lyric": "Sa Hari kong Manunubos"
          },
          {
            "chord": "                G                                                G",
            "lyric": "Kapayapaa't Kagalaka'y Lubos"
          },
          {
            "chord": "                      Am        D              G",
            "lyric": "Kung ako'y Naglilingkod"
          }
        ]
      },
      {
        "type": "Chorus",
        "lines": [
          {
            "chord": "                    G           G/B            C",
            "lyric": "Kung ako'y Naglilingkod"
          },
          {
            "chord": "                      D                                 G",
            "lyric": "Ang Buong kaya'y Handog"
          },
          {
            "chord": "                      G          Bm      C",
            "lyric": "Ang Tuwa'y di Matatapos"
          },
          {
            "chord": "Am                        G            D               G",
            "lyric": "Kung sa Kanya'y Maglingkod"
          }
        ]
      },
      {
        "type": "Verse 2",
        "lines": [
          {
            "chord": "                    G                                                       G",
            "lyric": "Ang Tinatangkilik ko ay Dadalhin"
          },
          {
            "chord": "                  C                  D              G",
            "lyric": "Kay Jesus na Aking Giliw"
          },
          {
            "chord": "                     G                                                 G",
            "lyric": "May Galak, Kapayapaan, at Aliw"
          },
          {
            "chord": "                Am                 D            G",
            "lyric": "Na Walang Pagmamaliw"
          }
        ]
      },
      {
        "type": "Verse 3",
        "lines": [
          {
            "chord": "                     G                                                               G",
            "lyric": "Ang Patnubay ng Kanyang mga Kamay"
          },
          {
            "chord": "                   C                              D   G",
            "lyric": "Ang sa Aki'y Nagbabantay"
          },
          {
            "chord": "            G                                                       G",
            "lyric": "at Ako'y Panatag sa Paglalakbay"
          },
          {
            "chord": "                   C                 D         G",
            "lyric": "Kung Siya ang Kaakbay"
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "title": "Isisigaw, Hallelujah",
    "author": "Hope Filipino Worship",
    "tempo": "♩ = 110",
    "timeSignature": "4/4",
    "verses": [
      {
        "type": "Verse 1",
        "lines": [
          {
            "chord": "                                           G            A    Bm",
            "lyric": "Ang puso ko ngayo'y umaawit"
          },
          {
            "chord": "                       G       A       Bm",
            "lyric": "Ako'y sa'yo ika'y sakin"
          },
          {
            "chord": "                                  G                  A         Bm",
            "lyric": "May saya't galak sa 'yong piling"
          },
          {
            "chord": "                       G       A       Bm",
            "lyric": "Ako'y sa'yo ika'y sakin"
          }
        ]
      },
      {
        "type": "Pre-Chorus",
        "lines": [
          {
            "chord": "           G                                 F#m",
            "lyric": "Kaibigan aking takbuhan"
          },
          {
            "chord": "                  Em                                     D",
            "lyric": "Kapayapaan ang 'yong hatid"
          },
          {
            "chord": "             G                                     F#m",
            "lyric": "Kaligtasan sa'yong pangalan"
          },
          {
            "chord": "       Em   F#m   G         G#     A",
            "lyric": "Kasama sa habang buhay"
          }
        ]
      },
      {
        "type": "Chorus",
        "lines": [
          {
            "chord": "             G      A      Bm",
            "lyric": "Isisigaw          hallelujah (woah)"
          },
          {
            "chord": " G                                  A ",
            "lyric": "Jesus You're the only one"
          },
          {
            "chord": "         Bm                                                     G    A   Bm",
            "lyric": "Ang buhay ko'y Sa'yo lamang           hallelujah"
          },
          {
            "chord": "        G                      A",
            "lyric": "Wala ng hahanapin pa"
          },
          {
            "chord": "                  Bm                                                     Intro",
            "lyric": "'Coz Jesus You are more than enough (woah yeah)"
          }
        ]
      },
      {
        "type": "Verse 2",
        "lines": [
          {
            "chord": "                                           G            A    Bm",
            "lyric": "Ang puso ko ngayo'y umaawit"
          },
          {
            "chord": "                       G       A       Bm",
            "lyric": "Ako'y sa'yo ika'y sa'kin"
          },
          {
            "chord": "                                  G                  A         Bm",
            "lyric": "May saya't galak sa 'yong piling"
          },
          {
            "chord": "                       G       A       Bm",
            "lyric": "Ako'y sa'yo ika'y sakin"
          }
        ]
      },
      {
        "type": "Pre-Chorus",
        "lines": [
          {
            "chord": "           G                                 F#m",
            "lyric": "Kaibigan aking takbuhan"
          },
          {
            "chord": "                  Em                                     D",
            "lyric": "Kapayapaan ang 'yong hatid"
          },
          {
            "chord": "             G                                     F#m",
            "lyric": "Kaligtasan sa'yong pangalan"
          },
          {
            "chord": "       Em   F#m   G         G#     A",
            "lyric": "Kasama sa habang buhay"
          }
        ]
      },
      {
        "type": "Chorus",
        "lines": [
          {
            "chord": "             G      A      Bm",
            "lyric": "Isisigaw          hallelujah "
          },
          {
            "chord": " G                                  A ",
            "lyric": "Jesus You're the only one"
          },
          {
            "chord": "         Bm                                                     G    A   Bm",
            "lyric": "Ang buhay ko'y sa'yo lamang           hallelujah"
          },
          {
            "chord": "        G                      A",
            "lyric": "Wala ng hahanapin pa"
          },
          {
            "chord": "                  Bm                                                     Intro",
            "lyric": "'Coz Jesus you are more than enough"
          }
        ]
      },
      {
        "type": "Bridge",
        "lines": [
          {
            "chord": "Em",
            "lyric": "Oh-wooh-oh"
          },
          {
            "chord": "F#m",
            "lyric": "Oh-wooh-oh"
          },
          {
            "chord": "G",
            "lyric": "Oh-wooh-oh"
          },
          {
            "chord": "G",
            "lyric": "Jesus You are more than enough"
          },
          {
            "chord": "Em",
            "lyric": "Oh-wooh-oh"
          },
          {
            "chord": "F#m",
            "lyric": "Oh-wooh-oh"
          },
          {
            "chord": "G",
            "lyric": "Oh-wooh-oh"
          },
          {
            "chord": "G",
            "lyric": "Jesus You are more than enough"
          },
          {
            "chord": "Em",
            "lyric": "Oh-wooh-oh"
          },
          {
            "chord": "F#m",
            "lyric": "Oh-wooh-oh"
          },
          {
            "chord": "G",
            "lyric": "Oh-wooh-oh"
          },
          {
            "chord": "G",
            "lyric": "Jesus You are more than enough"
          },
          {
            "chord": "Em",
            "lyric": "Oh-wooh-oh"
          },
          {
            "chord": "F#m              A",
            "lyric": "Oh-wooh-oh"
          }
        ]
      },
      {
        "type": "Chorus",
        "lines": [
          {
            "chord": "",
            "lyric": "Isisigaw          hallelujah"
          },
          {
            "chord": "",
            "lyric": "Jesus You're the only one"
          },
          {
            "chord": "                                                                       G    A   Bm",
            "lyric": "Ang buhay ko'y Sa'yo lamang          hallelujah"
          },
          {
            "chord": "        G                      A",
            "lyric": "Wala ng hahanapin pa"
          },
          {
            "chord": "                  Bm                                                       G           A",
            "lyric": "'Coz Jesus You are more than enough"
          },
          {
            "chord": "  Bm",
            "lyric": "Hallelujah"
          },
          {
            "chord": " G                                  A ",
            "lyric": "Jesus You're the only one"
          },
          {
            "chord": "         Bm                                                     G    A   Bm",
            "lyric": "Ang buhay ko'y Sa'yo lamang          hallelujah"
          },
          {
            "chord": "        G                      A",
            "lyric": "Wala ng hahanapin pa "
          },
          {
            "chord": "                  Bm                                                     Intro",
            "lyric": "'Coz Jesus You are more than enough "
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "title": "Kapanatagang Maligaya",
    "author": "Joseph Knapp",
    "tempo": "♩ = 42",
    "timeSignature": "4/4",
    "verses": [
      {
        "type": "Intro",
        "lines": [
          {
            "chord": "G              F#m             G             F#m              G              F#m             G",
            "lyric": ""
          }
        ]
      },
      {
        "type": "Verse 1",
        "lines": [
          {
            "chord": "                   D              G                     D ",
            "lyric": "Kapanatagang,     Maligaya"
          },
          {
            "chord": "                    Bm       E                               A       A/C#",
            "lyric": "Ang Idinulot,    ng ating Ama"
          },
          {
            "chord": "                   D               G                      D",
            "lyric": "Sa Kaluluwang     Nagkasala"
          },
          {
            "chord": "                      Em       A                    D",
            "lyric": "Na nahahanda     sa parusa"
          }
        ]
      },
      {
        "type": "Chorus",
        "lines": [
          {
            "chord": "                        D          G                        D",
            "lyric": "Laging Aawit,      Gabi't Araw"
          },
          {
            "chord": "                         Bm          E                                    A",
            "lyric": "Sa Pagpupuring,     Walang Humpay "
          },
          {
            "chord": "                                  D       G                            D",
            "lyric": "At ang kay Kristo      na Pangalan"
          },
          {
            "chord": "                             Em      A                                  D",
            "lyric": "ay Luwalhatiing     Walang Hanggan"
          }
        ]
      },
      {
        "type": "Verse 2",
        "lines": [
          {
            "chord": "                              D        G                         D ",
            "lyric": "Tunay na Hain,       ng Pagsuko"
          },
          {
            "chord": "                            Bm       E                                   A     A/C#",
            "lyric": "Samong Dalisay     na may pagsuyo"
          },
          {
            "chord": "                            D       G                               D",
            "lyric": "Labing malinis,     Bagong puso"
          },
          {
            "chord": "               Em        A                               D",
            "lyric": "Ang Iaalay     kong Pangako"
          }
        ]
      },
      {
        "type": "Verse 3",
        "lines": [
          {
            "chord": "                          D              G                     D",
            "lyric": "Bunga ng Aking       Pananalig"
          },
          {
            "chord": "                            Bm    E                        A      A/C#",
            "lyric": "sa Diyos at tao       ay isusulit"
          },
          {
            "chord": "                 D            G                            D",
            "lyric": "Kaligayaha'y        Makakamit"
          },
          {
            "chord": "                               Em         A                D",
            "lyric": "sa Diyos na ating         Iniibig"
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "title": "Gintong Panahon",
    "author": "Unknown",
    "tempo": "♩ = 60",
    "timeSignature": "4/4",
    "verses": [
      {
        "type": "Verse 1",
        "lines": [
          {
            "chord": "                         D                           F#m",
            "lyric": "Sa bawat oras at sandali"
          },
          {
            "chord": "                   Bm                  F#m",
            "lyric": "Magpupuri sayo lagi"
          },
          {
            "chord": "                    G                            D/F#",
            "lyric": "Pagsamaba'y mananatili"
          },
          {
            "chord": "         Em                           A",
            "lyric": "Sayo ang luwalhati"
          }
        ]
      },
      {
        "type": "Verse 1",
        "lines": [
          {
            "chord": "                         D                           F#m",
            "lyric": "Sa bawat oras at sandali"
          },
          {
            "chord": "                   Bm                  F#m",
            "lyric": "Magpupuri sayo lagi"
          },
          {
            "chord": "                    G                            D/F#",
            "lyric": "Pagsamaba'y mananatili"
          },
          {
            "chord": "         Em                           A",
            "lyric": "Sayo ang luwalhati"
          }
        ]
      },
      {
        "type": "Chorus",
        "lines": [
          {
            "chord": "                         Bm         A         G                        D",
            "lyric": "Ako'y maglilingkod sayo Panginoon"
          },
          {
            "chord": "               Bm                      A    ",
            "lyric": "Susundin ang kalooban mo"
          },
          {
            "chord": "          G                          A",
            "lyric": "Sa habang panahon"
          },
          {
            "chord": "       Bm                      A",
            "lyric": "Iaalay maging buhay"
          },
          {
            "chord": "        G                  D/F#",
            "lyric": "Sa'yo Panginoon"
          },
          {
            "chord": "       Em                               F#m",
            "lyric": "Upang ang bawat sandali"
          },
          {
            "chord": "        G                  A                       D",
            "lyric": "Maging Gintong Panahon"
          }
        ]
      }
    ]
  }
];
}

// ── Render Song Lines ─────────────────────────────────
function renderSongContent(verses, semitones = 0) {
  let html = '';
  verses.forEach(verse => {
    html += `<div class="verse-block"><div class="verse-label">${verse.type}</div>`;
    verse.lines.forEach(line => {
      const tc = transposeLine(line.chord, semitones);
      html += `<div class="song-line">
        <div class="chord-row">${tc && tc.trim() ? tc : '&nbsp;'}</div>
        <div class="lyric-row">${line.lyric || '&nbsp;'}</div>
      </div>`;
    });
    html += '</div>';
  });
  return html;
}

// ── Key Display ───────────────────────────────────────
const KEY_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
function getTransposedKeyLabel(baseKey, semitones) {
  if (!baseKey) return '';
  const idx = KEY_NAMES.indexOf(baseKey);
  if (idx === -1) return baseKey;
  return KEY_NAMES[((idx + semitones) % 12 + 12) % 12];
}
