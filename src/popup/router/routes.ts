import Overview from './pages/Cabinet/Overview/Overview';
import Cabinet from './pages/Cabinet/Cabinet';
import CyberDCabinet from './pages/Cabinet/CyberDCabinet/CyberDCabinet';
import GeesomeCabinet from './pages/Cabinet/GeesomeCabinet/GeesomeCabinet';
import Login from './pages/Cabinet/Login/Login';
import NewWallet from './pages/NewWallet/NewWallet';
import Welcome from './pages/NewWallet/Welcome/Welcome';
import ChooseMethod from './pages/NewWallet/ChooseMethod/ChooseMethod';
import CreateWallet from './pages/NewWallet/CreateWallet/CreateWallet';
import ImportWallet from './pages/NewWallet/ImportWallet/ImportWallet';
import ImportAccount from './pages/Cabinet/CyberDCabinet/ImportAccount/ImportAccount';
import LinkHashes from './pages/Cabinet/CyberDCabinet/LinkHashes/LinkHashes';
import Search from './pages/Cabinet/CyberDCabinet/Search/Search';
import SavedContent from './pages/Cabinet/IpfsCabinet/SavedContent/SavedContent';

export default [
  {
    path: '',
    component: Cabinet,
    children: [
      {
        path: '',
        name: 'cabinet-overview',
        component: Overview,
      },
      {
        path: '/login',
        name: 'cabinet-login',
        component: Login,
      },
      {
        path: '/cyberd',
        name: 'cabinet-cyberd',
        component: CyberDCabinet,
      },
      {
        path: '/cyberd/import',
        name: 'cabinet-cyberd-import',
        component: ImportAccount,
      },
      {
        path: '/cyberd/link',
        name: 'cabinet-cyberd-link',
        component: LinkHashes,
      },
      {
        path: '/cyberd/search',
        name: 'cabinet-cyberd-search',
        component: Search,
      },
      {
        path: '/ipfs/saved-content',
        name: 'cabinet-ipfs-saved-content',
        component: SavedContent,
      },
      {
        path: '/geesome',
        name: 'cabinet-geesome',
        component: GeesomeCabinet,
      },
    ],
  },
  {
    path: '/new-wallet',
    component: NewWallet,
    children: [
      {
        path: '/welcome',
        name: 'new-wallet-welcome',
        component: Welcome,
      },
      {
        path: '/choose-method',
        name: 'new-wallet-method',
        component: ChooseMethod,
      },
      {
        path: '/create-wallet',
        name: 'new-wallet-create',
        component: CreateWallet,
      },
      {
        path: '/import-wallet',
        name: 'new-wallet-import',
        component: ImportWallet,
      },
    ],
  },
  {
    path: '*',
    redirect: '',
  },
];
