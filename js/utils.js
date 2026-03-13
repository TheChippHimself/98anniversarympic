// ═══════════════════════════════════════════════════════
//  IEMELIF Songbook — Shared Utilities
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
  // Match root note + optional accidental + chord quality
  return chord.replace(/[A-G][#b]?/g, (match) => transposeNote(match, semitones));
}

function transposeLine(line, semitones) {
  if (!line || semitones === 0) return line;
  // Only transpose tokens that look like chords (start with A-G)
  return line.replace(/\b[A-G][#b]?(?:maj|min|m|sus|dim|aug|add|dom|M)?[0-9]?(?:\/[A-G][#b]?)?\b/g,
    (chord) => transposeChord(chord, semitones));
}

// ── Song Data Storage (localStorage) ─────────────────
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

function getDefaultSongs() {
  return [
    {
      id: 1,
      title: "Blessings",
      author: "Laura Story",
      tempo: "♩ = 72",
      timeSignature: "4/4",
      verses: [
        {
          type: "Verse 1",
          lines: [
            { chord: "G                    D", lyric: "We pray for blessings, we pray for peace," },
            { chord: "Em7                  C", lyric: "Comfort for family, protection while we sleep." },
            { chord: "G                    D", lyric: "We pray for healing, for prosperity," },
            { chord: "Em7                  C", lyric: "We pray for Your mighty hand to ease our suffering." },
          ]
        },
        {
          type: "Chorus",
          lines: [
            { chord: "G         D", lyric: "And all the while, You hear each spoken need," },
            { chord: "Em7        C", lyric: "Yet love is way too much to give us lesser things." },
            { chord: "G            D", lyric: "'Cause what if Your blessings come through raindrops," },
            { chord: "Em7              C", lyric: "What if Your healing comes through tears?" },
            { chord: "G              D", lyric: "What if a thousand sleepless nights are what it takes" },
            { chord: "Em7            C", lyric: "To know You're near?" },
          ]
        },
        {
          type: "Bridge",
          lines: [
            { chord: "C           G", lyric: "What if trials of this life are Your mercies in disguise?" },
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Great Is Thy Faithfulness",
      author: "Thomas O. Chisholm",
      tempo: "♩ = 80",
      timeSignature: "3/4",
      verses: [
        {
          type: "Verse 1",
          lines: [
            { chord: "G       C     G", lyric: "Great is Thy faithfulness, O God my Father," },
            { chord: "G      Em      A7     D", lyric: "There is no shadow of turning with Thee;" },
            { chord: "G       C     G", lyric: "Thou changest not, Thy compassions, they fail not;" },
            { chord: "G    D7   G", lyric: "As Thou hast been Thou forever wilt be." },
          ]
        },
        {
          type: "Chorus",
          lines: [
            { chord: "G       G7   C     Cm", lyric: "Great is Thy faithfulness! Great is Thy faithfulness!" },
            { chord: "G          D7      G", lyric: "Morning by morning new mercies I see;" },
            { chord: "G           C       G", lyric: "All I have needed Thy hand hath provided," },
            { chord: "G    D7    G", lyric: "Great is Thy faithfulness, Lord, unto me!" },
          ]
        }
      ]
    },
    {
      id: 3,
      title: "How Great Is Our God",
      author: "Chris Tomlin",
      tempo: "♩ = 76",
      timeSignature: "4/4",
      verses: [
        {
          type: "Verse 1",
          lines: [
            { chord: "G", lyric: "The splendor of the King, clothed in majesty," },
            { chord: "Em7", lyric: "Let all the earth rejoice, all the earth rejoice." },
            { chord: "C", lyric: "He wraps Himself in light, and darkness tries to hide," },
            { chord: "D", lyric: "And trembles at His voice, trembles at His voice." },
          ]
        },
        {
          type: "Chorus",
          lines: [
            { chord: "G", lyric: "How great is our God, sing with me," },
            { chord: "Em7", lyric: "How great is our God, and all will see" },
            { chord: "C          D         G", lyric: "How great, how great is our God." },
          ]
        },
        {
          type: "Bridge",
          lines: [
            { chord: "Em7      C", lyric: "Name above all names, worthy of all praise," },
            { chord: "G         D", lyric: "My heart will sing how great is our God." },
          ]
        }
      ]
    },
    {
      id: 4,
      title: "To God Be the Glory",
      author: "Fanny J. Crosby",
      tempo: "♩ = 88",
      timeSignature: "4/4",
      verses: [
        {
          type: "Verse 1",
          lines: [
            { chord: "G          C       G", lyric: "To God be the glory, great things He hath taught us," },
            { chord: "G         D        G", lyric: "Great things He hath done, and great our rejoicing." },
            { chord: "G          C        G", lyric: "Through Jesus the token, by whom are we given" },
            { chord: "G     D7     G", lyric: "The vilest offender who truly believes," },
          ]
        },
        {
          type: "Chorus",
          lines: [
            { chord: "G       D         G", lyric: "Praise the Lord, praise the Lord, let the earth hear His voice!" },
            { chord: "G       D         G", lyric: "Praise the Lord, praise the Lord, let the people rejoice!" },
            { chord: "G           C        G", lyric: "Oh, come to the Father through Jesus the Son," },
            { chord: "G      D7      G", lyric: "And give Him the glory, great things He hath done." },
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
    html += `<div class="verse-block">
      <div class="verse-label">${verse.type}</div>`;
    verse.lines.forEach(line => {
      const transposedChord = transposeLine(line.chord, semitones);
      html += `<div class="song-line">
        <div class="chord-row">${formatChordRow(transposedChord)}</div>
        <div class="lyric-row">${line.lyric || '&nbsp;'}</div>
      </div>`;
    });
    html += `</div>`;
  });
  return html;
}

function formatChordRow(chordStr) {
  if (!chordStr || !chordStr.trim()) return '&nbsp;';
  return chordStr;
}

// ── Key Display ───────────────────────────────────────
const KEY_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
function getTransposedKeyLabel(baseKey, semitones) {
  if (!baseKey) return '';
  const idx = KEY_NAMES.indexOf(baseKey);
  if (idx === -1) return baseKey;
  return KEY_NAMES[((idx + semitones) % 12 + 12) % 12];
}