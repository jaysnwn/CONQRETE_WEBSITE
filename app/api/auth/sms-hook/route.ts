import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Verify the Supabase Hook Secret
    const authHeader = request.headers.get('Authorization');
    const secret = process.env.SUPABASE_AUTH_HOOK_SECRET;

    if (!secret) {
      console.error('SUPABASE_AUTH_HOOK_SECRET is not configured');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    if (authHeader !== `Bearer ${secret}`) {
      console.error('Invalid auth hook signature');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse the payload
    // Supabase Send SMS Hook payload format:
    // {
    //   "user": { ... },
    //   "sms": {
    //     "phone": "+919876543210",
    //     "otp": "123456"
    //   }
    // }
    const body = await request.json();
    const phone = body?.sms?.phone;
    const otp = body?.sms?.otp;

    if (!phone || !otp) {
      console.error('Missing phone or otp in payload', body);
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // 3. Call 2Factor API
    const apiKey = process.env.TWOFACTOR_API_KEY;
    const templateName = process.env.TWOFACTOR_TEMPLATE_NAME;

    if (!apiKey) {
      console.error('TWOFACTOR_API_KEY is not configured');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // Remove the '+' from the phone number if 2Factor expects just the digits with country code
    const cleanPhone = phone.replace('+', '');

    // 2Factor Custom OTP endpoint:
    // https://2factor.in/API/V1/{api_key}/SMS/{phone}/{otp}[/{template_name}]
    let url = `https://2factor.in/API/V1/${apiKey}/SMS/${cleanPhone}/${otp}`;
    if (templateName) {
      url += `/${templateName}`;
    }

    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    if (data.Status !== 'Success') {
      console.error('2Factor API failed', data);
      return NextResponse.json({ error: 'Failed to dispatch SMS' }, { status: 502 });
    }

    // Must return 200 OK so Supabase knows the hook succeeded
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Unhandled error in SMS hook', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
