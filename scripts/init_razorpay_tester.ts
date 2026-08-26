import { createClient } from '@supabase/supabase-js';
import pkg from '@next/env';
const { loadEnvConfig } = pkg;

// Load .env.local
loadEnvConfig(process.cwd());

// Note: Run this script securely on the server via something like:
// npx ts-node scripts/init_razorpay_tester.ts

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const RAZORPAY_REVIEW_MODE = process.env.RAZORPAY_REVIEW_MODE;
const TEST_EMAIL = process.env.RAZORPAY_TEST_EMAIL;
const TEST_PASSWORD = process.env.RAZORPAY_TEST_PASSWORD;
const TEST_PHONE = process.env.RAZORPAY_TEST_PHONE;

async function initTestUser() {
  if (RAZORPAY_REVIEW_MODE !== 'true') {
    console.log('Review mode is disabled. Aborting.');
    return;
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing Supabase URL or Service Role Key.');
    process.exit(1);
  }

  if (!TEST_EMAIL || !TEST_PASSWORD || !TEST_PHONE) {
    console.error('Missing Razorpay test credentials in environment variables.');
    process.exit(1);
  }

  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  console.log(`Checking if test user ${TEST_EMAIL} exists...`);
  
  // Create or get user
  const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) {
    console.error('Failed to list users:', listError);
    process.exit(1);
  }
  
  let user = usersData.users.find(u => u.email === TEST_EMAIL);
  
  if (!user) {
    console.log('Creating test user...');
    const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      phone: TEST_PHONE,
      email_confirm: true,
      phone_confirm: true,
      user_metadata: {
        is_razorpay_tester: true
      }
    });
    
    if (createError) {
      console.error('Failed to create test user:', createError);
      process.exit(1);
    }
    user = createData.user;
    console.log('Test user created:', user.id);
  } else {
    console.log('Test user already exists:', user.id);
    
    // Ensure password is up to date
    await supabaseAdmin.auth.admin.updateUserById(user.id, {
      password: TEST_PASSWORD,
      phone: TEST_PHONE,
      email_confirm: true,
      phone_confirm: true
    });
  }

  // Provision profile (idempotent via unique constraint)
  console.log('Provisioning test profile...');
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .upsert({
      id: user.id,
      phone: TEST_PHONE,
      full_name: 'Razorpay Test',
      status: 'active'
    }, { onConflict: 'id' });
    
  if (profileError) {
    console.error('Failed to provision profile:', profileError);
  } else {
    console.log('Test profile provisioned.');
  }

  // Provision customer (idempotent via unique constraint)
  console.log('Provisioning test customer...');
  const { error: customerError } = await supabaseAdmin
    .from('customers')
    .upsert({
      id: user.id,
      phone_number: TEST_PHONE,
      first_name: 'Razorpay',
      last_name: 'Test'
    }, { onConflict: 'id' });
    
  if (customerError) {
    console.error('Failed to provision customer:', customerError);
  } else {
    console.log('Test customer provisioned.');
  }

  // Provision default address
  console.log('Provisioning test address...');
  const { data: existingAddresses } = await supabaseAdmin
    .from('addresses')
    .select('id')
    .eq('customer_id', user.id);
    
  if (!existingAddresses || existingAddresses.length === 0) {
    const { error: addressError } = await supabaseAdmin
      .from('addresses')
      .insert({
        customer_id: user.id,
        street: '123 Razorpay Review St',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        phone: TEST_PHONE,
        is_default: true
      });
      
    if (addressError) {
      console.error('Failed to provision address:', addressError);
    } else {
      console.log('Test address provisioned.');
    }
  } else {
    console.log('Test address already exists.');
  }

  console.log('Done! Test customer is ready.');
}

initTestUser().catch(console.error);
