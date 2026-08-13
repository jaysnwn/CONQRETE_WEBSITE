import { loginAdmin } from './actions';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f4f6f8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '8vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <style>{`
        .admin-login-input {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 12px;
          font-size: 14px;
          border-radius: 6px;
          border: 1px solid #c9cccf;
          outline: none;
          color: #1a1a1a;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .admin-login-input:focus {
          border-color: #005bd3;
          box-shadow: 0 0 0 1px #005bd3;
        }
        .admin-login-btn {
          width: 100%;
          padding: 11px 16px;
          background-color: #1a1a1a;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 4px;
          transition: background-color 0.2s;
        }
        .admin-login-btn:hover {
          background-color: #303030;
        }
        .admin-login-btn:active {
          background-color: #000000;
        }
      `}</style>
      
      {/* Brand Logo Header */}
      <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: '45px',
          height: '45px',
          backgroundColor: '#c8ff00',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          fontSize: '24px',
          color: '#111a00'
        }}>
          C
        </div>
      </div>

      {/* Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '40px 32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      }}>
        <h1 style={{
          margin: '0 0 4px',
          fontSize: '24px',
          fontWeight: 600,
          color: '#1a1a1a',
          letterSpacing: '-0.02em'
        }}>Log in</h1>
        <p style={{
          margin: '0 0 28px',
          fontSize: '14px',
          color: '#616161'
        }}>Continue to CONQRETE</p>

        <form action={loginAdmin} style={{ display: 'flex', flexDirection: 'column' }}>
          <input type="hidden" name="next" value={params.next || '/admin'} />

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '13px',
              color: '#303030',
              fontWeight: 500
            }}>Password</label>
            <input
              type="password"
              name="password"
              autoFocus
              required
              className="admin-login-input"
            />
          </div>

          {params.error && (
            <div style={{
              marginBottom: '16px',
              padding: '10px 12px',
              borderRadius: '6px',
              backgroundColor: '#fbeae5',
              border: '1px solid #e4b4a4',
              color: '#8c2e0b',
              fontSize: '13px',
              fontWeight: 500
            }}>
              Incorrect password. Please try again.
            </div>
          )}

          <button
            type="submit"
            className="admin-login-btn"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
