import { AppWallet, StorageVars } from '../../../../../services/data';
import { CyberD } from '../../../../../services/cyberd';
import { addIpfsContentArray, saveContent } from '../../../../../services/backgroundGateway';

const pIteration = require('p-iteration');

export default {
  template: require('./SaveAndLinkContent.html'),
  created() {
    this.linkKeywords = this.$route.query.linkKeywords;
    this.inputDescription = this.$route.query.description;
    this.size = this.$route.query.size;
  },
  methods: {
    async saveAndLink() {
      await saveContent({
        contentHash: this.resultContentHash,
        size: this.size,
        description: this.inputDescription,
        keywords: this.resultKeywords,
      });

      if (this.linkKeywords) {
        const keywordHashes = await addIpfsContentArray(this.resultKeywords);

        const results = await pIteration.mapSeries(keywordHashes, async keywordHash => {
          return CyberD.link(
            {
              address: this.currentAccount.address,
              privateKey: await AppWallet.decryptByPassword(this.currentAccount.encryptedPrivateKey),
            },
            keywordHash,
            this.resultContentHash
          );
        });

        console.log('link results', results);
      }

      this.$notify({
        type: 'success',
        text: this.linkKeywords ? 'Successfully saved and linked' : 'Successfully saved',
      });

      this.$router.push({ name: 'cabinet-cyberd' });
    },
  },
  computed: {
    resultContentHash() {
      return this.contentHash || this.inputContentHash;
    },
    resultKeywords() {
      return this.keywords || this.inputKeywordsStr.split(/[ ,]+/);
    },
    contentHash() {
      return this.$route.query.contentHash;
    },
    keywords() {
      return this.$route.query.keywords;
    },
    keywordsStr() {
      return this.keywords ? this.keywords.join(', ') : '';
    },
    currentAccount() {
      return this.$store.state[StorageVars.Account];
    },
    disableSaveAndLink() {
      return !(this.contentHash || this.inputContentHash) || (this.linkKeywords && !(this.keywordsStr || this.inputKeywordsStr));
    },
  },
  watch: {
    // async resultContentHash() {
    //   this.size = ((await getIpfsFileStats(this.resultContentHash)) as any).size || 0;
    // }
  },
  data() {
    return {
      inputContentHash: '',
      inputDescription: '',
      inputKeywordsStr: '',
      linkKeywords: false,
      saveToGeesome: false,
    };
  },
};